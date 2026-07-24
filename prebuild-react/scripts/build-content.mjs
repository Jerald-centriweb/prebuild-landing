/**
 * Static content page generator.
 *
 * The site is a React SPA, which is a poor SEO vehicle: before JavaScript runs
 * there is almost nothing in the HTML, and most AI crawlers (GPTBot,
 * PerplexityBot, ClaudeBot) never run it. These pages are therefore emitted as
 * plain static HTML into public/, exactly like /privacy and /terms. They index
 * with zero JS, load instantly, and cannot be broken by an app error.
 *
 * Markdown in content/ plus front matter -> a page per file, with:
 *   - Article + BreadcrumbList JSON-LD (FAQPage too, when the file has an FAQ)
 *   - canonical, Open Graph, Twitter card
 *   - automatic "related reading" links, which is what turns a pile of pages
 *     into a topic cluster Google can follow
 *   - a sitemap covering every generated page plus the fixed ones
 *
 * No npm dependencies on purpose. The markdown subset below is everything the
 * content actually uses, and adding a parser for it is not worth the supply
 * chain.
 *
 * Run: node scripts/build-content.mjs  (wired into npm run build)
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENT_DIR = join(ROOT, 'content')
const PUBLIC_DIR = join(ROOT, 'public')
const ORIGIN = 'https://prebuildsystems.com'

/* ── front matter ─────────────────────────────────────────────── */
function parseFrontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { meta: {}, body: raw }
  const meta = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const k = line.slice(0, i).trim()
    let v = line.slice(i + 1).trim()
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      v = v.replace(/^["']|["']$/g, '')
    }
    meta[k] = v
  }
  return { meta, body: raw.slice(m[0].length) }
}

/* ── markdown subset ──────────────────────────────────────────── */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) =>
      `<a href="${h}"${/^https?:/.test(h) ? ' rel="noopener"' : ''}>${t}</a>`)
}

function renderMarkdown(md) {
  const out = []
  const lines = md.split('\n')
  let i = 0
  let listBuf = null

  const flushList = () => {
    if (listBuf) { out.push(`<${listBuf.tag}>${listBuf.items.join('')}</${listBuf.tag}>`); listBuf = null }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) { flushList(); i++; continue }

    const h = line.match(/^(#{2,4})\s+(.*)$/)
    if (h) {
      flushList()
      const lvl = h[1].length
      const text = h[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      out.push(`<h${lvl} id="${id}">${inline(esc(text))}</h${lvl}>`)
      i++; continue
    }

    if (/^>\s?/.test(line)) {
      flushList()
      const buf = []
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++ }
      out.push(`<blockquote><p>${inline(esc(buf.join(' ')))}</p></blockquote>`)
      continue
    }

    const ul = line.match(/^[-*]\s+(.*)$/)
    const ol = line.match(/^\d+\.\s+(.*)$/)
    if (ul || ol) {
      const tag = ul ? 'ul' : 'ol'
      if (!listBuf || listBuf.tag !== tag) { flushList(); listBuf = { tag, items: [] } }
      listBuf.items.push(`<li>${inline(esc((ul || ol)[1]))}</li>`)
      i++; continue
    }

    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s|:-]+\|$/.test(lines[i + 1])) {
      flushList()
      const cells = (r) => r.split('|').slice(1, -1).map((c) => c.trim())
      const head = cells(line)
      i += 2
      const rows = []
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(cells(lines[i])); i++ }
      out.push(
        `<div class="scroll"><table><thead><tr>${head.map((c) => `<th>${inline(esc(c))}</th>`).join('')}</tr></thead>` +
        `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(esc(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
      )
      continue
    }

    flushList()
    const buf = []
    while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|[-*]\s|\d+\.\s|>|\|)/.test(lines[i])) {
      buf.push(lines[i]); i++
    }
    if (buf.length) out.push(`<p>${inline(esc(buf.join(' ')))}</p>`)
  }
  flushList()
  return out.join('\n')
}

/* ── page shell ───────────────────────────────────────────────── */
function shell({ meta, slug, html, related, faq }) {
  const url = `${ORIGIN}/${slug}`
  const graph = [
    {
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.published,
      dateModified: meta.updated || meta.published,
      author: { '@type': 'Organization', name: 'PreBuild', url: ORIGIN },
      publisher: { '@type': 'Organization', name: 'PreBuild', url: ORIGIN },
      mainEntityOfPage: url,
      about: meta.keywords || undefined,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'PreBuild', item: ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${ORIGIN}/guides` },
        { '@type': 'ListItem', position: 3, name: meta.shortTitle || meta.title, item: url },
      ],
    },
  ]
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(meta.title)}" />
<meta property="og:description" content="${esc(meta.description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="PreBuild" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(meta.title)}" />
<meta name="twitter:description" content="${esc(meta.description)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/guides.css" />
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}
</script>
</head>
<body>

<div class="bar"><div class="wrap">
  <a class="back" href="/">← PreBuild</a>
  <a class="bar-cta" href="/#calculator">What your quoting costs →</a>
</div></div>

<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/guides">Guides</a>
  </nav>

  <p class="kicker">${esc(meta.category || 'Guide')}</p>
  <h1>${esc(meta.h1 || meta.title)}</h1>
  <p class="standfirst">${esc(meta.description)}</p>
  <p class="meta-line">Updated ${esc(meta.updated || meta.published)} · For Australian residential builders</p>

  <article>
${html}
  </article>

  <aside class="cta-block">
    <h2>See what your own quoting costs</h2>
    <p>Your numbers, your maths, every figure shows its working. No email needed to see the total.</p>
    <a class="cta" href="/#calculator">Run the numbers →</a>
  </aside>

${related.length ? `  <section class="related">
    <h2>Related reading</h2>
    <ul>
${related.map((r) => `      <li><a href="/${r.slug}">${esc(r.meta.shortTitle || r.meta.title)}</a><span>${esc(r.meta.description)}</span></li>`).join('\n')}
    </ul>
  </section>` : ''}
</main>

<footer><div class="wrap">
  <p>© 2026 PreBuild · For Australian residential builders</p>
  <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:info@prebuildsystems.com">info@prebuildsystems.com</a></p>
</div></footer>

</body>
</html>
`
}

/* ── build ────────────────────────────────────────────────────── */
function build() {
  if (!existsSync(CONTENT_DIR)) {
    console.log('[content] no content/ directory, skipping')
    return
  }
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
  const pages = files.map((f) => {
    const raw = readFileSync(join(CONTENT_DIR, f), 'utf8')
    const { meta, body } = parseFrontMatter(raw)
    return { slug: meta.slug || basename(f, '.md'), meta, body }
  })

  for (const page of pages) {
    // FAQ blocks become FAQPage schema. "### Q" followed by prose.
    const faq = []
    const faqSection = page.body.split(/^##\s+.*(?:FAQ|Common questions).*$/mi)[1]
    if (faqSection) {
      for (const m of faqSection.matchAll(/^###\s+(.+)\n+([\s\S]*?)(?=\n###|\n##|$)/gm)) {
        faq.push({ q: m[1].trim(), a: m[2].replace(/\s+/g, ' ').trim().slice(0, 900) })
      }
    }

    // Cluster siblings: same category first, then the pillar.
    const related = pages
      .filter((p) => p.slug !== page.slug)
      .sort((a, b) => {
        const score = (p) => (p.meta.category === page.meta.category ? 0 : 1) + (p.meta.pillar === 'true' ? -0.5 : 0)
        return score(a) - score(b)
      })
      .slice(0, 3)

    const html = renderMarkdown(page.body)
    const dir = join(PUBLIC_DIR, page.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), shell({ meta: page.meta, slug: page.slug, html, related, faq }))
    console.log(`[content] /${page.slug}  (${html.length} chars${faq.length ? `, ${faq.length} FAQ` : ''})`)
  }

  buildGuidesIndex(pages)
  buildSitemap(pages)
}

function buildGuidesIndex(pages) {
  const byCat = {}
  for (const p of pages) (byCat[p.meta.category || 'Guides'] ||= []).push(p)

  const body = Object.entries(byCat).map(([cat, ps]) => `
    <h2>${esc(cat)}</h2>
    <ul class="guide-list">
${ps.map((p) => `      <li><a href="/${p.slug}">${esc(p.meta.shortTitle || p.meta.title)}</a><span>${esc(p.meta.description)}</span></li>`).join('\n')}
    </ul>`).join('\n')

  const html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Guides for Australian Builders | PreBuild</title>
<meta name="description" content="Practical guides on charging for preliminary work, qualifying enquiries, and converting more of the quotes you already send." />
<link rel="canonical" href="${ORIGIN}/guides" />
<meta property="og:title" content="Guides for Australian Builders | PreBuild" />
<meta property="og:description" content="Practical guides on charging for preliminary work, qualifying enquiries, and converting more of the quotes you already send." />
<meta property="og:url" content="${ORIGIN}/guides" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/guides.css" />
</head>
<body>
<div class="bar"><div class="wrap">
  <a class="back" href="/">← PreBuild</a>
  <a class="bar-cta" href="/#calculator">What your quoting costs →</a>
</div></div>
<main class="wrap">
  <p class="kicker">Guides</p>
  <h1>Guides for Australian builders</h1>
  <p class="standfirst">Everything here is about the front end: who you quote, what you charge to look at a job, and why the quotes you already send go quiet.</p>
${body}
</main>
<footer><div class="wrap">
  <p>© 2026 PreBuild · For Australian residential builders</p>
  <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:info@prebuildsystems.com">info@prebuildsystems.com</a></p>
</div></footer>
</body>
</html>
`
  mkdirSync(join(PUBLIC_DIR, 'guides'), { recursive: true })
  writeFileSync(join(PUBLIC_DIR, 'guides', 'index.html'), html)
  console.log('[content] /guides (index)')
}

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10)
  const fixed = [
    { loc: '/', priority: '1.0', freq: 'weekly', mod: today },
    { loc: '/guides', priority: '0.8', freq: 'weekly', mod: today },
    { loc: '/partners', priority: '0.8', freq: 'monthly', mod: today },
    { loc: '/privacy', priority: '0.3', freq: 'yearly', mod: '2026-07-24' },
    { loc: '/terms', priority: '0.3', freq: 'yearly', mod: '2026-07-24' },
  ]
  const urls = [
    ...fixed,
    ...pages.map((p) => ({
      loc: `/${p.slug}`,
      priority: p.meta.pillar === 'true' ? '0.9' : '0.7',
      freq: 'monthly',
      mod: p.meta.updated || p.meta.published || today,
    })),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${ORIGIN}${u.loc}</loc>
    <lastmod>${u.mod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
  writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), xml)
  console.log(`[content] sitemap.xml (${urls.length} urls)`)
}

build()
