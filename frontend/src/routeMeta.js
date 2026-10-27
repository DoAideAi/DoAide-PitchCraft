/**
 * SEO metadata for every public, indexable route. Shared by the useSEO hook
 * (wired in App) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * Tools reachable at a short path too (/valuation, /checker, ...) list it in
 * `aliases`: same page, canonical to /tools/..., left out of the sitemap.
 */

import { BLOG_INDEX, BLOG_POSTS } from './content/blogPosts.js'

export const SITE = {
  name: 'DoAide PitchCraft',
  baseUrl: 'https://pitch.doaide.com',
  ogImage: 'https://pitch.doaide.com/og-pitchcraft.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

// Fit "<title> | DoAide PitchCraft" into ~70 chars; long titles go without it.
const withSuffix = (title) => (`${title} | DoAide PitchCraft`.length <= 70 ? `${title} | DoAide PitchCraft` : title)

const tool = (path, aliases, h1, title, description) => ({
  path,
  aliases,
  h1,
  title: withSuffix(title),
  description,
  kind: 'tool',
})

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Your Pitch Deck in 5 Minutes',
    title: 'DoAide PitchCraft — AI Pitch Deck Generator for Startups',
    description:
      'Generate pitch deck outlines, financial models and startup valuations with AI. Free tools for founders: burn rate, elevator pitch and investor Q&A prep.',
  },
  tool(
    '/generator',
    [],
    'AI Pitch Deck Generator',
    'AI Pitch Deck Generator — Slide-by-Slide Outline',
    'Enter your startup details and get an AI-generated, slide-by-slide pitch deck outline covering problem, solution, market, traction and the ask.'
  ),
  tool(
    '/model',
    [],
    'Financial Model Builder',
    'Startup Financial Model Builder — 3-Year P&L',
    'Enter revenue assumptions and costs to generate a 3-year P&L projection for your startup. Free financial model builder for founders.'
  ),
  tool(
    '/tools/valuation-calculator',
    ['/valuation'],
    'Startup Valuation Calculator',
    'Startup Valuation Calculator — Revenue Multiples',
    'Estimate your startup’s pre-money valuation using industry revenue multiples. Free valuation calculator for seed and Series A founders.'
  ),
  tool(
    '/tools/burn-rate-calculator',
    ['/burn-rate'],
    'Burn Rate Calculator',
    'Burn Rate & Runway Calculator for Startups',
    'Enter your cash balance and monthly costs to see your burn rate and how many months of runway you have left. Free, no sign-up.'
  ),
  tool(
    '/tools/investor-readiness-quiz',
    ['/checker'],
    'Pitch Deck Readiness Checker',
    'Investor Readiness Quiz — Is Your Pitch Deck Ready?',
    'Answer 10 questions to see how investor-ready your pitch deck is, with a score and specific gaps to fix before you pitch. Free quiz.'
  ),
  tool(
    '/tools/elevator-pitch-generator',
    ['/elevator-pitch'],
    'Elevator Pitch Generator',
    'AI Elevator Pitch Generator — 30, 60 & 90 Seconds',
    'Generate 30, 60 and 90-second elevator pitches tailored to your startup with AI. Free elevator pitch generator for founders.'
  ),
  tool(
    '/tools/investor-qa-prep',
    ['/investor-qa'],
    'Investor Q&A Prep',
    'Investor Q&A Prep — Practice Tough VC Questions',
    'AI generates the tough questions investors will ask about your startup, with suggested answers, so you walk into the pitch prepared.'
  ),
  tool(
    '/tools/pitch-deck-outline',
    ['/pitch-outline'],
    'Pitch Deck Outline Creator',
    'Pitch Deck Outline Creator — 12-Slide Template',
    'Instantly create a structured 12-slide pitch deck outline for your startup. No AI needed, works offline. Free pitch deck template.'
  ),
  {
    path: '/pricing',
    kind: 'page',
    h1: 'Simple, Transparent Pricing',
    title: 'Pricing — Free, Pro $29 & Enterprise $99 | DoAide PitchCraft',
    description:
      'Start free with the valuation calculator, pitch outline and financial model. Upgrade to Pro for full AI pitch decks, or Enterprise for teams.',
  },
  {
    path: '/embed',
    kind: 'page',
    h1: 'Embed PitchCraft Widget',
    title: 'Embed Free Startup Tools on Your Website | DoAide PitchCraft',
    description:
      'Add DoAide PitchCraft tools like the valuation and burn rate calculators to your website or blog with a simple embed code.',
  },
  {
    path: '/blog',
    kind: 'blog',
    h1: 'PitchCraft Blog',
    title: 'Startup Fundraising Blog — Pitch Decks & Valuation | DoAide PitchCraft',
    description:
      'Guides for founders on pitch decks, startup valuation, financial models, investor questions and raising funding in India.',
  },
  ...BLOG_INDEX.map((p) => ({
    path: `/blog/${p.slug}`,
    kind: 'post',
    h1: p.title,
    title: withSuffix(p.title),
    description: BLOG_POSTS[p.slug]?.description ?? p.excerpt,
    published: p.date,
    faqs: BLOG_POSTS[p.slug]?.faqs,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path || r.aliases?.includes(path))

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  let main
  switch (route.kind) {
    case 'home':
      main = {
        '@type': 'SoftwareApplication',
        name: SITE.name,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: [
          { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Enterprise', price: '99', priceCurrency: 'USD' },
        ],
        author: ORG,
      }
      break
    case 'tool':
      main = {
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
      break
    case 'post':
      main = {
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        dateModified: route.published,
        author: ORG,
        publisher: ORG,
      }
      break
    default:
      main = {
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
  const graph = [main]
  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
