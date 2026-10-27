import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_INDEX, BLOG_POSTS } from "./content/blogPosts";
import { jsonLdFor, metaForPath, routes } from "./routeMeta";

const appSrc = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf-8");

describe("routeMeta", () => {
  it("has unique paths, titles and descriptions", () => {
    for (const key of ["path", "title", "description"]) {
      const values = routes.map((r) => r[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("only lists paths the router serves, and never the dashboard", () => {
    const served = new Set([...appSrc.matchAll(/<Route path="(\/[^"]*)"/g)].map((m) => m[1]));
    for (const r of routes) {
      for (const p of [r.path, ...(r.aliases ?? [])]) {
        if (!p.startsWith("/blog/")) expect(served.has(p), p).toBe(true);
      }
    }
    expect(metaForPath("/dashboard")).toBeUndefined();
  });

  it("resolves short tool aliases to the canonical /tools page", () => {
    expect(metaForPath("/valuation").path).toBe("/tools/valuation-calculator");
    expect(metaForPath("/checker").path).toBe("/tools/investor-readiness-quiz");
  });

  it("covers every blog post with a dated BlogPosting and complete FAQs", () => {
    expect(Object.keys(BLOG_POSTS).sort()).toEqual(BLOG_INDEX.map((p) => p.slug).sort());
    for (const p of BLOG_INDEX) {
      const graph = jsonLdFor(metaForPath(`/blog/${p.slug}`))["@graph"];
      expect(graph[0]["@type"]).toBe("BlogPosting");
      expect(graph[0].datePublished).toBe(p.date);
      for (const q of graph.find((n) => n["@type"] === "FAQPage")?.mainEntity ?? []) {
        expect(q.name && q.acceptedAnswer.text).toBeTruthy();
      }
    }
  });

  it("does not claim ratings the product does not have", () => {
    expect(JSON.stringify(jsonLdFor(metaForPath("/")))).not.toMatch(/aggregateRating/i);
  });
});
