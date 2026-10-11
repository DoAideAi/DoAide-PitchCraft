import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const CONTENT = {
  "pitch-deck-templates-indian-startups": {
    title: "Best Pitch Deck Templates for Indian Startups: Formats That Win Funding in 2025",
    date: "2025-03-15",
    description: "Discover the best pitch deck templates tailored for Indian startups. Learn formats that resonate with Indian VCs, angel investors, and accelerator programs like Y Combinator and Sequoia Surge.",
    faqs: [
      { q: "What is the best pitch deck template for Indian startups?", a: "The best pitch deck template for Indian startups follows a 10-12 slide format covering problem, solution, market size (with India-specific TAM), business model, traction, team, and funding ask. Templates that highlight India's demographic advantage and digital infrastructure growth tend to resonate most with domestic VCs." },
      { q: "How many slides should an Indian startup pitch deck have?", a: "Indian startup pitch decks should have 10-15 slides. Most Indian VCs like Sequoia Capital India, Accel, and Matrix Partners prefer concise decks that can be reviewed in under 4 minutes. Keep each slide focused on one key message." },
      { q: "Do Indian VCs prefer different pitch deck formats than US VCs?", a: "Yes, Indian VCs often place more emphasis on unit economics, path to profitability, and India-specific market dynamics. While US VCs may prioritize growth at all costs, Indian investors typically want to see capital efficiency and a clear understanding of the Indian consumer." },
      { q: "Where can I find free pitch deck templates for Indian startups?", a: "PitchCraft by DoAide offers free AI-powered pitch deck outline generation tailored for Indian startups. You can also find templates from accelerator programs like Sequoia Surge, 100X.VC, and Y Combinator's standard template adapted for the Indian market." },
    ],
    body: [
      { type: "p", text: "Raising funding for your Indian startup begins with one critical document — your pitch deck. Whether you are approaching angel investors in Bangalore, venture capital firms in Mumbai, or global accelerators like Y Combinator, the quality of your pitch deck determines whether you get a meeting or get ignored. In this guide, we break down the best pitch deck templates specifically designed for the Indian startup ecosystem." },
      { type: "h2", text: "Why Indian Startups Need India-Specific Pitch Deck Templates" },
      { type: "p", text: "The Indian startup ecosystem has matured dramatically. With over 100 unicorns and a vibrant network of angel investors, seed funds, and institutional VCs, India is now the third-largest startup ecosystem globally. But what works for a Silicon Valley startup doesn't always translate to the Indian market. Indian VCs evaluate startups differently — they place a premium on unit economics, capital efficiency, and understanding of India's unique market dynamics including price sensitivity, vernacular language adoption, and Tier 2/3 city penetration." },
      { type: "p", text: "A pitch deck template built for the Indian context addresses these expectations head-on. It helps founders present market sizing using India-specific data from sources like RedSeer, Redseer Strategy Consultants, and NASSCOM reports rather than generic global figures that don't resonate with domestic investors." },
      { type: "h2", text: "The 12-Slide Indian Startup Pitch Deck Template" },
      { type: "p", text: "After analysing hundreds of successful fundraises across Seed, Pre-Series A, and Series A rounds in India, we have identified the ideal 12-slide structure that Indian VCs respond to best." },
      { type: "p", text: "**Slide 1 — Title Slide.** Company name, one-line description, and founding team. Keep this clean. Include your logo and tagline. Example: 'Revolutionising last-mile delivery for Bharat's kirana stores.'" },
      { type: "p", text: "**Slide 2 — The Problem.** Frame the problem in the Indian context. Use India-specific data points. Example: '85% of India's $900 billion retail market is unorganised. Kirana store owners lose 15-20% revenue due to inefficient supply chains.' Statistics from IBEF, McKinsey India, or RBI reports add credibility." },
      { type: "p", text: "**Slide 3 — Your Solution.** Demonstrate how your product solves this problem. Use screenshots, a product demo GIF, or a simple workflow diagram. Indian VCs appreciate seeing a working product over just a vision." },
      { type: "p", text: "**Slide 4 — Market Opportunity.** This is where Indian pitch decks must shine. Use bottom-up market sizing rather than top-down. Instead of citing 'India's e-commerce market is $200 billion,' calculate: 'There are 12 million kirana stores in India. Our initial target is 500,000 stores in metros and Tier 1 cities, with an ARPU of ₹2,000/month, giving us a SAM of ₹1,200 crore ($150 million).'" },
      { type: "p", text: "**Slide 5 — Business Model.** Be explicit about how you make money. Indian investors are particularly keen on understanding pricing in rupees, not just dollars. Show your pricing tiers, take rates, or subscription plans. Include gross margins — Indian VCs are increasingly margin-conscious post the 2023 funding winter." },
      { type: "p", text: "**Slide 6 — Traction.** This is the most important slide for Indian startups post-2022. Show real numbers: MRR, GMV, user growth, retention rates, or signed LOIs. If you are pre-revenue, show waitlist size, pilot results, or partnership commitments. Indian VCs have shifted strongly towards traction-first evaluation." },
      { type: "p", text: "**Slide 7 — Go-to-Market Strategy.** How will you acquire your first 1,000 customers in India? Discuss channels: WhatsApp marketing, field sales, partnerships with industry associations, or referral programmes. Indian startups that show distribution insight — understanding how to reach Tier 2 and Tier 3 cities — stand out." },
      { type: "p", text: "**Slide 8 — Competitive Landscape.** Use a 2x2 matrix positioning yourself against competitors. Include both domestic competitors and global players operating in India. Acknowledge the competitive landscape honestly — saying 'we have no competitors' is a red flag for any VC, especially in India's crowded startup market." },
      { type: "p", text: "**Slide 9 — Team.** Highlight relevant experience, especially domain expertise in the Indian market. Indian VCs invest heavily in founding teams. Mention IIT/IIM pedigree if applicable (it still matters for many VCs), prior startup experience, or deep industry connections. Include key advisors." },
      { type: "p", text: "**Slide 10 — Financial Projections.** Three-year projections in both INR and USD. Show monthly projections for Year 1 and quarterly for Years 2-3. Include key assumptions explicitly. Indian VCs will stress-test your assumptions, so make them defensible." },
      { type: "p", text: "**Slide 11 — The Ask.** State clearly how much you are raising, the round stage, and how you will deploy the capital. Break it down: '40% product development, 30% sales and marketing, 20% hiring, 10% operations.' Include what milestones this round will unlock." },
      { type: "p", text: "**Slide 12 — Thank You and Contact.** Include your email, phone number, and LinkedIn profiles. Many Indian VCs prefer WhatsApp for initial follow-ups, so include a WhatsApp-enabled number." },
      { type: "h2", text: "Top Pitch Deck Formats Used by Successful Indian Startups" },
      { type: "p", text: "**The Sequoia Format.** Sequoia India's recommended format emphasises storytelling through the problem-solution arc. It follows a narrative structure: purpose → problem → solution → why now → market → competition → product → business model → team → financials. This format works well for Series A and above." },
      { type: "p", text: "**The 100X.VC Format.** Designed for early-stage Indian startups raising angel or pre-seed rounds. This is a more compact 8-10 slide format focusing heavily on team, problem validation, and initial traction. It is particularly effective for first-time founders in India." },
      { type: "p", text: "**The YC Format (Adapted for India).** Y Combinator's demo day format — extremely concise, metric-heavy, with minimal text per slide. Indian founders applying to YC or other global accelerators should use this format but include India-specific market context that international reviewers may not know." },
      { type: "h2", text: "Common Mistakes in Indian Startup Pitch Decks" },
      { type: "p", text: "Using only USD figures without INR context is a frequent mistake. Indian VCs think in rupees and crores. Citing global market sizes without India-specific breakdown makes you look uninformed. Omitting unit economics is a dealbreaker post-2023 — the days of growth-at-all-costs are over in Indian VC. Finally, not addressing regulatory risks (GST, data localisation, sector-specific regulations) can be a missed opportunity to show maturity." },
      { type: "h2", text: "Tools to Build Your Indian Startup Pitch Deck" },
      { type: "p", text: "PitchCraft by DoAide helps Indian founders generate investor-ready pitch deck outlines using AI. It is specifically designed to incorporate Indian market context, rupee-denominated financial models, and templates aligned with what top Indian VCs expect. Whether you are pitching to angel investors in India's startup hubs or applying to global accelerators, PitchCraft gives you a head start." },
      { type: "cta", text: "Generate your pitch deck outline now", to: "/tools/pitch-deck-outline" },
    ],
  },
  "investor-pitch-tips-india": {
    title: "How to Pitch to Indian Investors: 10 Tips That Actually Work in 2025",
    date: "2025-03-22",
    description: "Learn how to pitch effectively to Indian VCs, angel networks, and accelerators. Actionable tips covering what Indian investors look for, common mistakes, and how to prepare for investor meetings in India.",
    faqs: [
      { q: "How do I approach investors in India?", a: "Start with warm introductions through mutual connections, LinkedIn outreach, or accelerator demo days. Indian investors like Sequoia, Accel, and Matrix accept cold pitches via email but respond much better to referrals. Angel networks like Indian Angel Network, Mumbai Angels, and LetsVenture also accept direct applications." },
      { q: "What do Indian VCs look for in a startup pitch?", a: "Indian VCs prioritise strong founding teams with domain expertise, clear product-market fit evidence, capital-efficient growth, solid unit economics, and a large addressable market within India. Post-2023, profitability path and burn management have become critical evaluation criteria." },
      { q: "How much equity should I give to investors in India?", a: "At the seed stage in India, founders typically give 10-20% equity. Pre-Series A rounds dilute 15-25%, and Series A rounds typically involve 20-30% dilution. The exact percentage depends on your valuation, traction, and negotiating leverage. Always consult a startup lawyer before finalising term sheets." },
      { q: "What is the average time to close a funding round in India?", a: "Seed rounds in India typically take 2-4 months from first meeting to money in the bank. Series A rounds take 3-6 months. The timeline includes initial pitch, due diligence, term sheet negotiation, legal documentation, and fund transfer. Having a clean data room and prompt responsiveness can significantly shorten this timeline." },
    ],
    body: [
      { type: "p", text: "Pitching to investors in India is a different game than pitching in Silicon Valley. The Indian venture capital landscape has its own rhythms, expectations, and unwritten rules. Whether you are a first-time founder in Bangalore or a serial entrepreneur in Delhi-NCR, these ten actionable tips will help you pitch more effectively to Indian investors and dramatically improve your chances of getting funded." },
      { type: "h2", text: "1. Lead with India-Specific Market Insight" },
      { type: "p", text: "Indian investors have seen thousands of pitches that begin with 'India has 1.4 billion people.' That is not an insight — it is a census fact. Instead, lead with a specific, non-obvious observation about the Indian market that demonstrates your deep understanding. For example: 'India's UPI processed 12 billion transactions last month, yet 60% of merchants still reconcile payments manually using paper registers.' This shows you understand both the opportunity and the gap." },
      { type: "p", text: "The best Indian startup pitches demonstrate that the founder lives and breathes the market they are building for. If you are solving a problem for kirana stores, talk about the 50 store owners you interviewed in Dharavi. If you are building for Indian SMEs, show the WhatsApp groups where business owners discuss their challenges. Ground-level insight beats top-down analysis every time." },
      { type: "h2", text: "2. Show Your Unit Economics Early" },
      { type: "p", text: "The Indian VC ecosystem went through a significant correction in 2023-2024. The era of 'grow at all costs' is over. Today's Indian investors — from early-stage angels to growth-stage VCs — want to see that your business model works at the unit level. Include your CAC (customer acquisition cost), LTV (lifetime value), payback period, and gross margins in your pitch, even at the seed stage." },
      { type: "p", text: "If you are pre-revenue, show your projected unit economics with clearly stated assumptions. Indian VCs will challenge these numbers, so be prepared to defend them. A founder who says 'our blended CAC is ₹350 and our 12-month LTV is ₹2,100, giving us a 6x ratio' immediately signals sophistication to Indian investors." },
      { type: "h2", text: "3. Address the India Distribution Challenge" },
      { type: "p", text: "Building a great product is only half the battle in India. Distribution — reaching customers across a geographically and linguistically diverse country — is often the harder problem. Indian investors will specifically ask how you plan to acquire and retain customers beyond Tier 1 cities. A go-to-market strategy that works in Bangalore may not work in Lucknow or Coimbatore." },
      { type: "p", text: "Show your distribution strategy in detail: Are you leveraging WhatsApp for organic growth? Building a field sales team? Partnering with existing distribution networks like telecom retailers or banking correspondents? Indian startups that have cracked distribution at scale — like Meesho, PharmEasy, and CRED — consistently emphasise this in their investor pitches." },
      { type: "h2", text: "4. Understand the Indian VC Landscape" },
      { type: "p", text: "Not all Indian investors are the same. Angel networks like Indian Angel Network, Mumbai Angels, and Chennai Angels typically invest ₹25 lakh to ₹2 crore. Micro VCs like 100X.VC, Titan Capital, and Better Capital invest ₹50 lakh to ₹5 crore. Institutional VCs like Sequoia Capital India (now Peak XV Partners), Accel, Matrix (now Z47), and Elevation Capital invest ₹5 crore and above." },
      { type: "p", text: "Research your target investor thoroughly before the pitch. Know their portfolio, check sizes, and sector focus. Pitching a B2B SaaS startup to an investor who only does consumer deals wastes everyone's time. LinkedIn, VCCircle, and Tracxn are excellent resources for researching Indian VCs." },
      { type: "h2", text: "5. Tell Your Founder Story" },
      { type: "p", text: "Indian VCs invest in people as much as ideas. Your founder story — why you are building this specific company, what unique insight or experience you bring — matters enormously. This is not about pedigree alone (though IIT/IIM backgrounds do open doors); it is about demonstrating obsession with the problem you are solving." },
      { type: "p", text: "If you spent 10 years in the insurance industry before building an insurtech startup, that is your story. If you grew up watching your parents struggle with a problem you are now solving, share that. Authentic founder stories create emotional connection and demonstrate conviction — two things Indian VCs value highly." },
      { type: "h2", text: "6. Present Financials in INR and Crores" },
      { type: "p", text: "A surprisingly common mistake: presenting all financial figures only in USD. Indian VCs think in rupees and crores. Your revenue should be '₹1.5 crore MRR' not '$180K MRR.' Your market size should be '₹50,000 crore' not '$6 billion.' Your funding ask should be '₹10 crore' alongside the dollar amount. This seems trivial, but it demonstrates that you are building for India, not just presenting a global pitch with an Indian label." },
      { type: "h2", text: "7. Prepare for Deep-Dive Questions" },
      { type: "p", text: "Indian VCs are known for rigorous questioning. Unlike some US investors who might make quick decisions based on pattern matching, Indian investors often conduct 3-5 meetings before making a decision. Prepare for detailed questions on regulatory landscape (GST implications, sector-specific regulations, data localisation requirements), competitive moat, hiring plans, and technology architecture." },
      { type: "p", text: "Have a detailed appendix ready with additional slides on technology stack, customer case studies, cohort analysis, and detailed financial assumptions. Many Indian VC meetings go past the main deck into these supporting materials." },
      { type: "h2", text: "8. Leverage Warm Introductions" },
      { type: "p", text: "Cold emails to Indian VCs have a response rate of less than 5%. Warm introductions through existing portfolio founders, accelerator networks, or mutual connections are far more effective. If you are in an accelerator programme like Sequoia Surge, Y Combinator, Techstars, or a leading Indian programme like NSRCEL or Venture Highway, leverage those networks actively." },
      { type: "p", text: "LinkedIn is particularly powerful in the Indian startup ecosystem. Many VCs actively engage on LinkedIn and respond to thoughtful, personalised connection requests. Share your startup journey publicly — many Indian investors discover startups through LinkedIn content." },
      { type: "h2", text: "9. Have a Clean Data Room Ready" },
      { type: "p", text: "Indian VCs conduct thorough due diligence. Having a well-organised data room ready before your first meeting shows professionalism and accelerates the process. Your data room should include: incorporation documents, cap table, financial statements, key contracts, IP documentation, and any regulatory filings. Use platforms like Notion, Google Drive, or dedicated data room tools to organise everything." },
      { type: "h2", text: "10. Follow Up Strategically" },
      { type: "p", text: "After the pitch, send a concise follow-up email within 24 hours with your deck attached, a one-paragraph summary of the key points, and clear next steps. If you don't hear back within a week, follow up once. Indian VCs see hundreds of pitches monthly, so polite persistence is appropriate. However, if an investor has explicitly passed, respect that decision and move on." },
      { type: "p", text: "Building investor relationships in India is a long game. An investor who passes on your seed round may lead your Series A. Stay on their radar with monthly investor updates showing your progress — this is one of the most effective long-term strategies in the Indian startup ecosystem." },
      { type: "h2", text: "Start Preparing Your Pitch Today" },
      { type: "p", text: "The Indian startup funding landscape rewards preparation. Founders who deeply understand their market, clearly articulate their unit economics, and present with authenticity consistently outperform those who rely on hype. Use PitchCraft by DoAide to generate AI-powered pitch deck outlines, practice with our investor Q&A simulator, and refine your elevator pitch before stepping into that crucial meeting." },
      { type: "cta", text: "Prepare for your investor pitch", to: "/tools/investor-qa-prep" },
    ],
  },
  "startup-funding-india-guide-2025": {
    title: "Complete Guide to Startup Funding in India 2025: Seed to Series A",
    date: "2025-04-01",
    description: "Everything Indian founders need to know about raising startup funding in 2025 — from angel rounds and seed funding to Series A, including top Indian VCs, funding stages, valuations, and how to prepare your pitch.",
    faqs: [
      { q: "How do I get startup funding in India?", a: "To get startup funding in India, start by building an MVP and validating your idea with early customers. Then prepare a compelling pitch deck with India-specific market data. Approach angel investors, seed funds, or accelerators aligned with your sector. Top funding sources include angel networks (Indian Angel Network, Mumbai Angels), micro VCs (100X.VC, Titan Capital), and institutional VCs (Peak XV Partners, Accel, Elevation Capital)." },
      { q: "What are the stages of startup funding in India?", a: "Startup funding in India typically follows these stages: Bootstrapping and Friends & Family (₹5-50 lakh), Angel/Pre-Seed (₹25 lakh to ₹2 crore), Seed (₹1-10 crore), Pre-Series A (₹5-25 crore), Series A (₹25-100 crore), and later stages (Series B, C, and beyond). Each stage has different investor types, valuation expectations, and milestone requirements." },
      { q: "What valuation can I expect for my seed-stage Indian startup?", a: "Seed-stage valuations in India typically range from ₹5-30 crore ($600K-$3.6M) depending on the sector, team strength, and early traction. SaaS startups often command higher valuations (₹15-30 crore) compared to consumer startups at the same stage. Post-2023, valuations have become more rational, with investors paying closer attention to metrics over narrative." },
      { q: "What government schemes support startup funding in India?", a: "Key government schemes include Startup India (tax benefits, self-certification, Fund of Funds), SIDBI's Fund of Funds for Startups, Atal Innovation Mission grants, state-level startup policies (Karnataka, Telangana, Maharashtra offer specific incentives), DPIIT recognition benefits, and various sector-specific schemes from ministries like MeitY for tech startups." },
    ],
    body: [
      { type: "p", text: "India's startup ecosystem raised over $8 billion in funding in 2024, and the momentum continues into 2025. With over 1,00,000 DPIIT-recognised startups and a growing network of domestic and international investors, there has never been a better time to raise funding for your Indian startup. But navigating the funding landscape — from understanding stages to approaching the right investors — can be overwhelming for first-time founders. This comprehensive guide covers everything you need to know about startup funding in India in 2025." },
      { type: "h2", text: "Understanding Startup Funding Stages in India" },
      { type: "p", text: "The Indian funding ecosystem follows a structured progression, though boundaries between stages are increasingly fluid. Understanding each stage helps you target the right investors at the right time with the right pitch." },
      { type: "p", text: "**Bootstrapping and Friends & Family (₹5-50 lakh).** Most Indian startups begin here. This is your own savings, contributions from family, or small loans to build your first prototype. India's relatively low development costs — compared to the US or Europe — make bootstrapping especially viable. Many successful Indian startups including Zoho, Zerodha, and Freshworks bootstrapped their initial phases." },
      { type: "p", text: "**Angel and Pre-Seed Round (₹25 lakh to ₹3 crore).** Angel investors are typically successful entrepreneurs or executives who invest their personal capital. India has several prominent angel networks: Indian Angel Network (IAN), Mumbai Angels, Hyderabad Angels, Chennai Angels, and platforms like LetsVenture and AngelList India. At this stage, investors evaluate primarily on team quality, market insight, and initial validation — a working prototype or early customer conversations are typically sufficient." },
      { type: "p", text: "**Seed Round (₹2-15 crore / $250K-$1.8M).** Seed funding in India has evolved significantly. Dedicated seed-stage funds like 100X.VC, Better Capital, Titan Capital, All In Capital, and WaterBridge Ventures now operate at this level. Multi-stage funds like Sequoia Capital (Peak XV Partners), Accel, and Elevation Capital also participate in larger seed rounds. At this stage, you need demonstrable product-market fit signals: paying customers, growing usage metrics, or strong engagement data." },
      { type: "p", text: "**Pre-Series A (₹5-25 crore / $600K-$3M).** A relatively new but important stage in the Indian funding ecosystem. Pre-Series A bridges the gap between seed and Series A, giving startups additional runway to strengthen their metrics before a larger raise. Investors at this stage include Blume Ventures, Kalaari Capital, Stellaris Venture Partners, and 3one4 Capital." },
      { type: "p", text: "**Series A (₹25-100 crore / $3-12M).** Series A is the inflection point where startups demonstrate they can scale. Indian Series A investors include Peak XV Partners (formerly Sequoia India), Accel, Matrix Partners (now Z47), Elevation Capital, Lightspeed India, and Nexus Venture Partners. At this stage, you need clear evidence of scalable unit economics, repeatable customer acquisition, and a defensible competitive position." },
      { type: "h2", text: "The Indian Funding Landscape in 2025" },
      { type: "p", text: "The Indian startup funding market has stabilised after the correction of 2022-2023. While mega-rounds have become less common, early-stage funding (seed and Series A) has remained robust. Several trends define the 2025 landscape." },
      { type: "p", text: "**Sector Focus.** AI and machine learning startups are attracting significant investor interest, particularly those applying AI to India-specific problems in healthcare, agriculture, education, and financial services. Climate tech, deep tech, and B2B SaaS continue to be strong sectors. Consumer internet and D2C brands face higher scrutiny on profitability." },
      { type: "p", text: "**Valuation Rationality.** Post-2023, Indian startup valuations have become more rational. Seed rounds that once commanded ₹30-50 crore valuations are now closing at ₹8-20 crore for similar-stage startups. This is healthy — it means less dilution pressure at later stages and more realistic expectations all around." },
      { type: "p", text: "**Rise of Revenue-Based Financing.** Alternative funding models including revenue-based financing (from players like GetVantage, Klub, and Velocity Finance) have gained traction in India. These are particularly relevant for startups with predictable revenue that want to raise capital without equity dilution." },
      { type: "p", text: "**Government Support.** The Indian government continues to strengthen its support for startups through Startup India, tax benefits under Section 80-IAC, the Fund of Funds managed by SIDBI, and state-level startup policies. Karnataka's Elevate programme, Telangana's T-Hub, and Maharashtra's startup policy offer additional incentives." },
      { type: "h2", text: "How to Prepare for Fundraising in India" },
      { type: "p", text: "Successful fundraising in India requires systematic preparation. Here is a step-by-step approach." },
      { type: "p", text: "**Step 1: Validate Your Idea.** Before approaching investors, validate your problem-solution fit. Talk to at least 50-100 potential customers. Indian VCs value customer discovery depth — they want to know you understand the Indian consumer's specific needs, behaviours, and willingness to pay." },
      { type: "p", text: "**Step 2: Build Your MVP.** India's development talent pool makes building MVPs cost-effective. Whether you build in-house or work with development agencies, get a working product that demonstrates your core value proposition. Indian investors increasingly prefer to see working products over slide decks." },
      { type: "p", text: "**Step 3: Generate Initial Traction.** Even small numbers matter. Ten paying customers, 500 waitlist signups, or three signed LOIs give you something concrete to present. Indian VCs in 2025 are traction-first investors — show them the numbers." },
      { type: "p", text: "**Step 4: Create Your Pitch Deck.** Build a 10-12 slide deck with India-specific market data, INR-denominated financials, and clear unit economics. Use PitchCraft by DoAide to generate an AI-powered first draft that you can refine." },
      { type: "p", text: "**Step 5: Build Your Target Investor List.** Research investors who have funded startups in your sector and stage. Use Tracxn, VCCircle, and LinkedIn to build a list of 30-50 potential investors. Prioritise those who have made investments similar to your profile." },
      { type: "p", text: "**Step 6: Seek Warm Introductions.** Network at startup events (TiE conferences, Headstart events, SaaSBOOMi for SaaS founders), accelerator demo days, and through LinkedIn. A warm introduction from a portfolio founder is worth ten cold emails." },
      { type: "h2", text: "Top Indian VCs and Investors by Stage" },
      { type: "p", text: "**Angel Networks:** Indian Angel Network (IAN), Mumbai Angels, Hyderabad Angels, Lead Angels, Chennai Angels. **Platforms:** LetsVenture, AngelList India, Tyke Invest. **Micro VCs (Seed):** 100X.VC, Titan Capital, Better Capital, All In Capital, 2am VC. **Early-Stage VCs:** Blume Ventures, Kalaari Capital, Stellaris Venture Partners, 3one4 Capital, WaterBridge Ventures. **Series A+:** Peak XV Partners, Accel, Z47 (Matrix), Elevation Capital, Lightspeed India, Nexus Venture Partners, Chiratae Ventures." },
      { type: "h2", text: "Key Metrics Indian Investors Evaluate" },
      { type: "p", text: "Understanding what metrics Indian investors scrutinise helps you prepare better. For SaaS startups: MRR/ARR, net revenue retention, CAC payback period, and logo churn. For consumer startups: DAU/MAU ratio, retention curves (Day 1, Day 7, Day 30), viral coefficient, and revenue per user. For marketplace startups: GMV, take rate, liquidity (supply-demand match), and repeat purchase rate. For all stages: burn multiple (net burn divided by net new ARR), gross margins, and runway remaining." },
      { type: "h2", text: "Legal and Regulatory Considerations" },
      { type: "p", text: "Indian startup fundraising involves specific legal requirements. Register your company as a Private Limited Company (most investor-friendly structure). Get DPIIT Startup India recognition for tax benefits. Understand ESOP regulations (critical for hiring in India's competitive talent market). If raising from foreign investors, comply with FEMA regulations and RBI guidelines. Work with a startup-specialised law firm — firms like AZB & Partners, Khaitan & Co, Trilegal, and several boutique startup law firms handle most Indian startup rounds." },
      { type: "h2", text: "Start Your Fundraising Journey" },
      { type: "p", text: "Raising funding for your Indian startup is a marathon, not a sprint. Start preparing months before you need the money — refine your pitch, build relationships with potential investors, and ensure your metrics tell a compelling story. Tools like PitchCraft by DoAide can accelerate your preparation with AI-powered pitch deck generation, investor Q&A simulation, and valuation calculators — all designed with the Indian startup ecosystem in mind." },
      { type: "cta", text: "Start building your pitch deck", to: "/generator" },
    ],
  },
  "perfect-elevator-pitch-formula": {
    title: "The Perfect Elevator Pitch: A Step-by-Step Formula for Founders",
    date: "2024-12-01",
    body: [
      { type: "p", text: "You have 30 seconds in an elevator with a potential investor. What do you say? The elevator pitch is the most important communication tool in a founder's arsenal, yet most founders stumble through it. Here's a proven formula to craft one that sticks." },
      { type: "h2", text: "The 4-Part Formula" },
      { type: "p", text: "Every great elevator pitch follows this structure: Hook, Problem, Solution, Ask. The hook grabs attention with a surprising fact or bold claim. The problem makes the investor nod in recognition. The solution shows your unique approach. The ask tells them what you want." },
      { type: "h2", text: "The 30-Second Version" },
      { type: "p", text: "Your shortest pitch needs just three elements: what you do, who you do it for, and why it matters. Example: 'We help SaaS companies reduce churn by 40% using predictive AI. We already have 50 paying customers and we're growing 20% month over month.' That's it — clear, specific, and memorable." },
      { type: "h2", text: "The 60-Second Version" },
      { type: "p", text: "With a full minute, you add context. Start with the problem: 'Every SaaS company loses 5-7% of customers monthly, costing them millions.' Then your solution: 'Our AI platform predicts which customers will churn 30 days before they do, giving success teams time to intervene.' Add traction: '50 customers, $500K ARR, and 20% MoM growth.' Close with the ask: 'We're raising $2M to scale our sales team.'" },
      { type: "h2", text: "The 90-Second Version" },
      { type: "p", text: "The extended pitch adds your competitive advantage and team credentials. After covering the core story, add: 'Unlike generic analytics tools, we integrate directly into the CRM workflow so success teams act on predictions without switching tools. Our founding team built the churn prediction engine at Salesforce, and our advisor is the former VP of Customer Success at HubSpot.'" },
      { type: "h2", text: "Common Mistakes to Avoid" },
      { type: "p", text: "Don't start with your company name — nobody cares until they care about your problem. Don't use jargon or buzzwords like 'revolutionary' or 'disruptive.' Don't try to explain your entire business — the pitch is a trailer, not the movie. And never, ever read from a script. Practice until it sounds natural." },
      { type: "h2", text: "Practice Makes Perfect" },
      { type: "p", text: "Record yourself delivering your pitch. Time it. Watch it back. Does it feel natural? Would you want to hear more? Practice with friends, co-founders, and strangers. The best pitches sound effortless because they've been rehearsed dozens of times." },
      { type: "cta", text: "Generate your elevator pitch now", to: "/tools/elevator-pitch-generator" },
    ],
  },
  "top-investor-questions-startup-founders": {
    title: "Top 20 Investor Questions Every Startup Founder Must Prepare For",
    date: "2024-12-05",
    body: [
      { type: "p", text: "Walking into an investor meeting unprepared is like showing up to a job interview without knowing the company. VCs ask pointed questions to test your understanding of your business, market, and strategy. Here are the 20 questions you must be ready for." },
      { type: "h2", text: "Market & Problem Questions" },
      { type: "p", text: "1. **Why now?** — What has changed in the market that makes this the right time? Investors want to know you're riding a wave, not creating one. 2. **How big is the market?** — Use TAM/SAM/SOM, but bottom-up sizing is more credible. 3. **Who are your customers?** — Be specific. 'Everyone' is not a target market. 4. **What happens if you don't solve this problem?** — Show the cost of inaction." },
      { type: "h2", text: "Product & Competition Questions" },
      { type: "p", text: "5. **What's your moat?** — Network effects, proprietary data, switching costs, or regulatory advantages. 'We'll move faster' is not a moat. 6. **Who are your competitors?** — Never say 'we have no competition.' Every startup competes with the status quo. 7. **Why can't Google/Amazon build this?** — Show why incumbents are poorly positioned. 8. **What's your unfair advantage?** — Domain expertise, key relationships, or proprietary technology." },
      { type: "h2", text: "Business Model Questions" },
      { type: "p", text: "9. **What are your unit economics?** — Know your CAC, LTV, payback period, and gross margins cold. 10. **How do you acquire customers?** — Show a repeatable, scalable acquisition strategy. 11. **What's your pricing strategy?** — Explain why your pricing captures value. 12. **What does your sales cycle look like?** — Length, decision makers, and close rate." },
      { type: "h2", text: "Traction & Financials Questions" },
      { type: "p", text: "13. **What's your current traction?** — Users, revenue, growth rate. Be honest about where you are. 14. **What are your key metrics?** — Know which 3-5 metrics drive your business. 15. **What's your burn rate and runway?** — Investors need to know when you'll need more money. 16. **What are your financial projections?** — 3-year projections with defensible assumptions." },
      { type: "h2", text: "Team & Strategy Questions" },
      { type: "p", text: "17. **Why are you the right team?** — Relevant experience, domain expertise, and complementary skills. 18. **What's your biggest risk?** — Self-awareness is strength. Name the risk and your mitigation plan. 19. **How will you use the funds?** — Be specific: hiring, product, sales, marketing. 20. **What milestones will you hit before the next raise?** — Show a clear path to your Series A or profitability." },
      { type: "h2", text: "How to Prepare" },
      { type: "p", text: "Write out answers to all 20 questions. Practice with your co-founder. Do mock pitches with advisor. Record yourself and review. The goal isn't to memorize answers — it's to internalize your story so deeply that no question catches you off guard." },
      { type: "cta", text: "Practice with AI-generated Q&A", to: "/tools/investor-qa-prep" },
    ],
  },
  "pitch-deck-mistakes-to-avoid": {
    title: "7 Pitch Deck Mistakes That Kill Your Fundraising Chances",
    date: "2024-12-10",
    body: [
      { type: "p", text: "After reviewing thousands of pitch decks, investors can spot the red flags in seconds. These seven mistakes are the most common reasons founders get rejected — and they're all fixable." },
      { type: "h2", text: "1. Leading with the Solution Instead of the Problem" },
      { type: "p", text: "Most founders are so excited about what they've built that they jump straight into the product. But investors need to feel the pain first. Spend your first two slides making the problem so vivid that the investor is already thinking about solutions before you present yours. Use data, customer quotes, or a personal story to make it real." },
      { type: "h2", text: "2. Claiming a $100B TAM Without Showing Your Math" },
      { type: "p", text: "Every startup claims a massive market. Top-down numbers ('the global CRM market is $100B') tell investors nothing about your actual opportunity. Instead, calculate bottom-up: how many potential customers exist, what would they pay, and what's your realistic capture rate? A credible $500M SAM beats a hand-wavy $50B TAM." },
      { type: "h2", text: "3. No Clear Business Model Slide" },
      { type: "p", text: "If investors can't figure out how you make money within 30 seconds, your deck has a problem. Show your pricing tiers, average contract value, and unit economics. If you're pre-revenue, show your pricing hypothesis and early validation. 'We'll figure out monetization later' is a dealbreaker." },
      { type: "h2", text: "4. Ignoring the Competition Slide" },
      { type: "p", text: "Saying 'we have no competitors' tells investors you haven't done your homework. Every startup competes — if not with direct competitors, then with the status quo, spreadsheets, or manual processes. Use a competitive matrix to position yourself clearly. Show where you win and be honest about where competitors are stronger." },
      { type: "h2", text: "5. Too Many Slides, Too Much Text" },
      { type: "p", text: "If your deck has 30 slides with paragraphs of text, investors will tune out. The sweet spot is 10-15 slides with minimal text — use visuals, charts, and bullet points. Your deck is a conversation starter, not a white paper. If you need to explain complex details, put them in an appendix." },
      { type: "h2", text: "6. Weak or Missing Traction Slide" },
      { type: "p", text: "Traction is the single most convincing element of any pitch. Even early-stage startups have something: waitlist signups, LOIs, pilot customers, user feedback, or growing engagement metrics. If you're pre-launch, show the velocity of your progress: 'Built MVP in 8 weeks, signed 3 pilot customers in 2 weeks' is traction." },
      { type: "h2", text: "7. The Ask Without a Plan" },
      { type: "p", text: "Asking for '$2M' without explaining how you'll deploy it and what milestones it enables is like asking someone for gas money without saying where you're driving. Break down your use of funds: 40% engineering, 30% sales, 20% marketing, 10% operations. Then show what metrics you'll hit: 'With this round, we'll reach $1M ARR and 100 customers in 18 months.'" },
      { type: "h2", text: "The Fix" },
      { type: "p", text: "Go through your deck slide by slide and ask: 'Does this slide earn its place?' Every slide should either build the narrative, prove traction, or make the ask. If it doesn't do one of these three things, cut it." },
      { type: "cta", text: "Create your pitch deck outline", to: "/tools/pitch-deck-outline" },
    ],
  },
  "how-to-create-winning-pitch-deck": {
    title: "How to Create a Winning Pitch Deck in 2024",
    date: "2024-11-15",
    body: [
      { type: "p", text: "A great pitch deck is the difference between getting funded and getting ghosted. After analyzing hundreds of successful startup decks, we've distilled the essential elements every investor expects to see." },
      { type: "h2", text: "The 12 Essential Slides" },
      { type: "p", text: "1. **Title Slide** — Company name, tagline, and your contact info. Keep it clean and memorable." },
      { type: "p", text: "2. **Problem** — What pain point exists? Use data and real stories to make it visceral." },
      { type: "p", text: "3. **Solution** — How does your product solve this problem? Show, don't tell." },
      { type: "p", text: "4. **Market Size** — TAM, SAM, SOM. Investors need to see the opportunity is big enough." },
      { type: "p", text: "5. **Business Model** — How do you make money? Be specific about pricing and unit economics." },
      { type: "p", text: "6. **Traction** — Users, revenue, growth rate, partnerships. This is your proof." },
      { type: "p", text: "7. **Go-to-Market** — How will you acquire customers? What channels work?" },
      { type: "p", text: "8. **Competition** — Show you understand the landscape. Position yourself clearly." },
      { type: "p", text: "9. **Team** — Why is YOUR team the one to build this? Relevant experience matters." },
      { type: "p", text: "10. **Financials** — 3-year projections. Revenue, costs, break-even." },
      { type: "p", text: "11. **The Ask** — How much are you raising? How will you use the funds?" },
      { type: "p", text: "12. **Thank You** — Contact info and a memorable closing." },
      { type: "h2", text: "Pro Tips" },
      { type: "p", text: "Keep it under 15 slides. Use visuals over text. Tell a story, not a report. Practice your delivery until it feels natural." },
      { type: "cta", text: "Generate your pitch deck outline now", to: "/generator" },
    ],
  },
  "startup-valuation-methods-explained": {
    title: "Startup Valuation Methods Explained: Which One Is Right for You?",
    date: "2024-11-10",
    body: [
      { type: "p", text: "Valuation is one of the most debated topics in startup fundraising. Understanding how VCs value your company gives you leverage in negotiations." },
      { type: "h2", text: "Revenue Multiples" },
      { type: "p", text: "The most common method for startups with revenue. Your valuation = Annual Revenue × Industry Multiple. SaaS companies typically get 8-15x, while e-commerce gets 2-5x. Growth rate significantly impacts the multiple." },
      { type: "h2", text: "Comparable Transactions" },
      { type: "p", text: "Look at what similar companies raised at. If a competitor with similar metrics raised at $20M, that's a strong benchmark for your valuation." },
      { type: "h2", text: "DCF Analysis" },
      { type: "p", text: "Discounted Cash Flow works for later-stage startups with predictable revenue. It values your company based on projected future cash flows, discounted to present value." },
      { type: "h2", text: "Which to Use?" },
      { type: "p", text: "Pre-revenue? Focus on comparables and market size. Early revenue? Revenue multiples are your best friend. Growing fast? The multiple adjusts upward based on growth rate." },
      { type: "cta", text: "Calculate your valuation now", to: "/valuation" },
    ],
  },
  "financial-model-first-time-founders": {
    title: "Building Your First Financial Model: A Guide for First-Time Founders",
    date: "2024-11-05",
    body: [
      { type: "p", text: "Every investor asks for a financial model. It doesn't need to be perfect — it needs to be thoughtful, defensible, and show you understand your business." },
      { type: "h2", text: "Start with Revenue" },
      { type: "p", text: "Bottom-up is better than top-down. Instead of 'we'll capture 1% of a $10B market,' start with: how many customers can you acquire per month, at what price, with what growth rate?" },
      { type: "h2", text: "Model Your Costs" },
      { type: "p", text: "Break costs into COGS (cost of goods sold, scales with revenue) and OpEx (operating expenses like rent, tools, marketing). Don't forget payroll — it's usually your biggest expense." },
      { type: "h2", text: "Project 36 Months" },
      { type: "p", text: "Three years is the standard. Month-by-month for Year 1, quarterly for Years 2-3. Show a clear path to profitability or explain why you're investing in growth instead." },
      { type: "h2", text: "Key Metrics to Track" },
      { type: "p", text: "Gross margin, burn rate, runway, CAC (customer acquisition cost), LTV (lifetime value), and break-even month. These tell investors whether your business model works." },
      { type: "cta", text: "Build your financial model now", to: "/model" },
    ],
  },
};

function useStructuredData(post, slug) {
  useEffect(() => {
    if (!post?.description) return;
    const blogPosting = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "DoAide | PitchCraft", url: "https://pitch.doaide.com" },
      publisher: { "@type": "Organization", name: "DoAide | PitchCraft", url: "https://pitch.doaide.com", logo: { "@type": "ImageObject", url: "https://pitch.doaide.com/favicon.svg" } },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://pitch.doaide.com/blog/${slug}` },
      url: `https://pitch.doaide.com/blog/${slug}`,
    };
    const scripts = [];
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.textContent = JSON.stringify(blogPosting);
    document.head.appendChild(s1);
    scripts.push(s1);
    if (post.faqs?.length) {
      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const s2 = document.createElement("script");
      s2.type = "application/ld+json";
      s2.textContent = JSON.stringify(faqPage);
      document.head.appendChild(s2);
      scripts.push(s2);
    }
    return () => scripts.forEach((s) => s.remove());
  }, [post, slug]);
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = CONTENT[slug];
  usePageTitle(post?.title || "Post Not Found");
  useStructuredData(post, slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Link to="/blog" className="text-brand hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center max-w-3xl w-full mx-auto px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-xl font-bold tracking-tight">DoAide <span className="text-brand">| PitchCraft</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/blog" className="text-sm text-ink-soft hover:text-brand">← Blog</Link>
          <ThemeToggle />
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">{post.title}</h1>
        <p className="text-sm text-ink-muted mb-8">{post.date}</p>
        <div className="space-y-4">
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="font-bold text-2xl mt-8 mb-2">{block.text}</h2>;
            if (block.type === "cta") return (
              <div key={i} className="panel text-center py-6 mt-8">
                <Link to={block.to} className="btn btn-primary text-base px-8">{block.text}</Link>
              </div>
            );
            return <p key={i} className="text-ink-soft leading-relaxed">{block.text}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
