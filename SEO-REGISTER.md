# SEO Issues & Fix Register — prebuildsystems.com

Same format as the House & Land register (`SEO HnL/docs/seo-issues-register.md`), adapted for a React SPA rather than WordPress.

**Owner legend:** `Built` = done and live. `Us` = we can execute it in code. `Owner` = needs Jerald (an account, a client's permission, a real photo). `Both` = we generate, Jerald approves or supplies input.

**Baseline recon date:** 2026-07-25. Site: single-page React SPA on Vercel, moved from `builder.centriweb.com` in July 2026.

---

## Fixed

| ID | Sev | Area | Issue | Fix | Status |
|---|---|---|---|---|---|
| 001 | 🔴 P1 | Indexability | 18 words of indexable HTML before JS ran. AI crawlers (GPTBot, PerplexityBot, ClaudeBot) do not execute JS, so the business was invisible to assistants | `noscript` content block + JSON-LD | ✅ 163 words |
| 002 | 🔴 P1 | Crawl | `robots.txt` 404, `sitemap.xml` 404 | Both added; robots explicitly allows AI crawlers | ✅ |
| 003 | 🔴 P1 | Schema | No structured data anywhere | JSON-LD `@graph`: Organization, Service, FAQPage on home; Article + BreadcrumbList + FAQPage on every guide | ✅ |
| 004 | 🔴 P1 | Content gap | **One page.** No cluster, no depth, nothing to rank for | Static content pipeline + first cluster (3 pages, 1,116–1,613 words) | ✅ seeded |
| 005 | 🟠 P2 | Internal links | Guides would be orphans, crawled reluctantly and passing no equity | Footer link to `/guides`; automatic related-reading between cluster pages | ✅ |
| 006 | 🟠 P2 | On-page | `og:url` pointed at the retired `builder.centriweb.com` | Corrected, canonical added | ✅ |
| 007 | 🟠 P2 | Accessibility | Primary CTA 4.11:1, trust line 2.1:1, stat sub-text 2.36:1 — all failing WCAG AA | Recoloured to 6.44:1 / 7.4:1 / ~5:1 | ✅ |
| 008 | 🟠 P2 | Core Web Vitals | `logo-wordmark.png` 5.7 MB, served at 38px | Resized to 300 KB; explicit dimensions to stop layout shift | ✅ |

---

## Open

| ID | Sev | Area | Issue | Owner | Pathway |
|---|---|---|---|---|---|
| 009 | 🔴 P1 | Trust / E-E-A-T | All five testimonials anonymous. One quotes a "Volume Builder, SA, 30+ homes" while the page lists volume builders under **Not right for you**, and the hero says 5–30 homes | Owner | One named builder, company and suburb. Delete the contradicting quote. Four independent signals now flag this, including a 58/100 persuasion audit where social proof was undetectable |
| 010 | 🔴 P1 | Legal / delivery | Calculator promises "your report is on its way". Delivery unverified; no n8n workflow is named for it | Owner | Submit the form and confirm. If it does not send, the copy changes in one line. At ad scale this is Fair Trading Act 1986 (NZ) and ACL exposure |
| 011 | 🟠 P2 | E-E-A-T | Site-wide stats (40+ hrs, 3,200 insolvencies, 30–60% budget gap) carry no sources | Both | Attribute the insolvency figure to ASIC; source or drop the others. House voice requires claims be verifiable |
| 012 | 🟠 P2 | Content depth | Cluster is 3 pages. Competitor runs ~25 long-form posts plus playbooks | Us | Extend to 8–10 across the four money categories: cost/budget, process/planning, comparison, mistakes/disqualification |
| 013 | 🟠 P2 | Content gap | Nothing addresses the **paid-quote** archetype in search. Price A Plan referrals arrive already charging | Us | Cluster 2: converting paid quotes, follow-up sequences, why paid preliminaries still go quiet |
| 014 | 🟠 P2 | Measurement | No Google Search Console, no analytics beyond the Meta Pixel. Rankings are unmeasured | Owner | GSC property + sitemap submission. See `SEO HnL/docs/GSC-SETUP.md` for the walkthrough |
| 015 | 🟠 P2 | Social preview | No `og:image`. Every share renders as a bare text card | Both | 1200×630 image. Needs a real project photo (see 016) |
| 016 | 🟠 P2 | Imagery | Hero interior and wireframe images are AI-generated stock. Australian builders will clock them instantly | Owner | One real photo of a completed client build |
| 017 | 🟡 P3 | Core Web Vitals | 4.5 MB hero video, 444 KB JS bundle. LCP target is under 2.5s | Us | Poster frame, lazy video load, route-split the bundle |
| 018 | 🟡 P3 | Distribution | No `/partners` page. The estimator referral channel is the single biggest asymmetry and has no landing surface | Us | Partner page, co-branded embeddable calculator, one-page forward asset |
| 019 | 🟡 P3 | Security | Repo is public with SSH host, port and username in `CLAUDE.md` | Owner | Make private, rotate the Hostinger password |

---

## Architecture note

WordPress gives House & Land a CMS. This site does not have one, and should not get one for the sake of a blog.

Content lives in `prebuild-react/content/*.md` and is compiled to static HTML by `scripts/build-content.mjs`, which runs before `vite build`. Adding a page means adding one markdown file with front matter. The sitemap, schema, breadcrumbs and internal links all regenerate.

This is deliberately better than the SPA for SEO: the guides need no JavaScript, so they are fully readable by the AI crawlers that ignore the main page.

## Cluster map

```
/guides
└── Paid preliminary work
    ├── /charging-for-preliminary-work        ← pillar
    ├── /how-much-to-charge-preliminary-agreement
    └── /why-builder-quotes-go-quiet
```

Next cluster should target the paid-quote archetype (issue 013), since that traffic arrives pre-sold via estimator referrals and converts on a shorter cycle than cold search.
