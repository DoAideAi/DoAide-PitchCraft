import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

const ANSWER_OPTIONS = [
  { value: "yes", label: "Yes", color: "good" },
  { value: "partial", label: "Partially", color: "warn" },
  { value: "no", label: "No", color: "bad" },
];

export default function CheckerPage() {
  usePageTitle("Pitch Deck Readiness Checker");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.getCheckerQuestions().then((qs) => { if (!cancelled) setQuestions(qs); }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

  const evaluate = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const payload = {
        answers: questions.map((q) => ({
          question_id: q.id,
          answer: answers[q.id] || "no",
        })),
      };
      const data = await api.evaluateChecker(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [questions, answers]);

  const gradeColor = result ? (result.score >= 75 ? "good" : result.score >= 50 ? "warn" : "bad") : "ink-soft";

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center max-w-5xl w-full mx-auto px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-xl font-bold tracking-tight">DoAide <span className="text-brand">| PitchCraft</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-3"><ThemeToggle /></div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">Pitch Deck Readiness Checker</h1>
        <p className="text-ink-soft mb-8">Answer 10 questions to see how investor-ready your pitch deck is.</p>

        {!result ? (
          <form onSubmit={evaluate} className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="panel">
                <p className="font-medium mb-3">
                  <span className="text-brand mr-2">{idx + 1}.</span>
                  {q.text}
                </p>
                <div className="flex gap-2">
                  {ANSWER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswer(q.id, opt.value)}
                      className={`btn flex-1 text-sm ${answers[q.id] === opt.value ? `bg-${opt.color} text-white border-${opt.color}` : "btn-ghost"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {error && <p className="text-bad text-sm">{error}</p>}
            <button type="submit" disabled={busy || questions.length === 0} className="btn btn-primary w-full">
              {busy ? <span className="spinner" /> : "Check Readiness"}
            </button>
          </form>
        ) : (
          <div style={{ animation: "fade-up 0.4s ease both" }}>
            <div className="panel text-center py-8">
              <div className={`text-6xl font-bold text-${gradeColor} mb-2`}>{result.grade}</div>
              <div className="text-2xl font-semibold mb-1">{result.score}/100</div>
              <p className="text-ink-soft">Pitch Deck Readiness Score</p>
            </div>

            {result.strengths.length > 0 && (
              <div className="panel mt-4">
                <h3 className="font-semibold text-good mb-2">Strengths</h3>
                <ul className="text-sm space-y-1">
                  {result.strengths.map((s, i) => <li key={i} className="text-ink-soft">✓ {s}</li>)}
                </ul>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="panel mt-4">
                <h3 className="font-semibold text-warn mb-2">Recommendations</h3>
                <ul className="text-sm space-y-1">
                  {result.recommendations.map((r, i) => <li key={i} className="text-ink-soft">→ {r}</li>)}
                </ul>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <a href={`https://wa.me/?text=${encodeURIComponent(`My pitch deck scored ${result.score}/100 (Grade ${result.grade}) on PitchCraft! Check yours: https://pitch.doaide.com/checker`)}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <button onClick={() => { setResult(null); setAnswers({}); }} className="btn btn-ghost flex-1">
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
