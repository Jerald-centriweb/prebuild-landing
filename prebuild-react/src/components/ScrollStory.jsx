import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    eyebrow: '01 — Qualification Engine',
    headline: ['We qualify', 'before you', 'quote.'],
    body: 'Most builders lose 40+ hours per phantom job. PreBuild intercepts the wrong leads before they ever reach your desk — automatically, with zero input from you.',
    stat: '40+ hrs',
    statLabel: 'lost per phantom quote',
  },
  {
    eyebrow: '02 — Automated Screening',
    headline: ['Every lead', 'scored.', 'Every hour', 'defended.'],
    body: 'The system runs a structured front-end process around your budget thresholds, timeline, and build type. You do not touch anything.',
    stat: '$6,000',
    statLabel: 'recovered per stopped phantom quote',
  },
  {
    eyebrow: '03 — Done For You',
    headline: ['Built for you.', 'Running in', '30 days.'],
    body: 'We configure, launch, and optimise during the first 30 days. You handle builds. We handle the filter that gets serious leads in front of you.',
    stat: '30 days',
    statLabel: 'to a fully running system',
  },
]

export default function ScrollStory() {
  const sectionRef     = useRef(null)
  const videoRef       = useRef(null)
  const panelRefs      = useRef([])
  const progressFillRef = useRef(null)
  const dotRefs        = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    const panels  = panelRefs.current.filter(Boolean)
    const dots    = dotRefs.current.filter(Boolean)
    const total   = panels.length
    let ctx

    const setupTimeline = () => {
      const duration = video.duration || 10

      ctx = gsap.context(() => {
        /* Initial panel states — only first visible */
        gsap.set(panels[0], { opacity: 1, y: 0 })
        gsap.set(panels.slice(1), { opacity: 0, y: 32 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${total * 650}`,
            pin: true,
            scrub: 2.5,        /* smoother scrub = less jank */
            anticipatePin: 1,
            onUpdate: (self) => {
              /* Progress bar */
              if (progressFillRef.current) {
                gsap.set(progressFillRef.current, {
                  scaleX: self.progress,
                  transformOrigin: 'left center',
                })
              }
              /* Active dot */
              const active = Math.min(Math.floor(self.progress * total), total - 1)
              dots.forEach((d, i) => d.classList.toggle('active', i === active))
            },
          },
        })

        /* ── Video scrub: frame-by-frame as you scroll ── */
        tl.to(video, {
          currentTime: duration,
          ease: 'none',
          duration: total,
        }, 0)

        /* ── Panel cross-fades ── */
        panels.forEach((panel, i) => {
          if (i < total - 1) {
            tl.to(panel, {
              opacity: 0,
              y: -22,
              duration: 0.38,
              ease: 'power2.in',
            }, i + 0.52)
            tl.to(panels[i + 1], {
              opacity: 1,
              y: 0,
              duration: 0.48,
              ease: 'power2.out',
            }, i + 0.72)
          }
        })
      }, section)
    }

    /* Wait for metadata so video.duration is available */
    if (video.readyState >= 1) {
      setupTimeline()
    } else {
      video.addEventListener('loadedmetadata', setupTimeline, { once: true })
    }

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="s-dark scroll-story" id="scroll-story">

      {/* Scroll progress bar — top edge */}
      <div className="ss-progress-track">
        <div ref={progressFillRef} className="ss-progress-fill" />
      </div>

      <div className="ss-inner">

        {/* ── LEFT: Video scrubbed frame-by-frame (the exploding / formation view) ── */}
        <div className="ss-visual">
          <video
            ref={videoRef}
            src="/video/Cinematic_Luxury_Home_Formation_Background.mp4"
            muted
            playsInline
            preload="auto"
            className="ss-video"
          />
          {/* Rightward gradient blends video into the text panel */}
          <div className="ss-visual-blend" />
        </div>

        {/* ── RIGHT: Story panels ── */}
        <div className="ss-text">
          <div className="ss-panels-wrap">
            {PANELS.map((panel, i) => (
              <div
                key={i}
                ref={el => { panelRefs.current[i] = el }}
                className="ss-panel"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: 0, left: 0, right: 0,
                }}
              >
                <span className="eyebrow">{panel.eyebrow}</span>

                <h2 className="ss-headline">
                  {panel.headline.map((line, j) => (
                    <span key={j} className="ss-headline-line">{line}</span>
                  ))}
                </h2>

                <p className="lead on-dark ss-body">{panel.body}</p>

                <div className="ss-stat-block">
                  <div className="ss-stat-num">{panel.stat}</div>
                  <div className="ss-stat-label">{panel.statLabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Panel position dots */}
          <div className="ss-dots">
            {PANELS.map((_, i) => (
              <div
                key={i}
                ref={el => { dotRefs.current[i] = el }}
                className={`ss-dot${i === 0 ? ' active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue — bottom right */}
      <div className="ss-scroll-cue">
        <span className="ss-scroll-label">Scroll</span>
        <div className="ss-scroll-line" />
      </div>

    </section>
  )
}
