import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { number: '01', title: 'Consultation', desc: 'We begin by listening — understanding your lifestyle, aspirations, and the soul of the space.' },
  { number: '02', title: 'Concept', desc: 'Mood boards, spatial planning, and material palettes take shape as your vision crystallizes.' },
  { number: '03', title: 'Design', desc: 'Detailed drawings, 3D visualizations, and specification documents bring every detail into focus.' },
  { number: '04', title: 'Execution', desc: 'Our trusted craftsmen bring the design to life with meticulous attention to every joint and finish.' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.process__label', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.process__label', start: 'top 85%' },
      })
      gsap.from('.process__heading', {
        y: 30, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.process__heading', start: 'top 85%' },
      })

      // Timeline line draw
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.process__timeline',
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: true,
        },
      })

      // Step reveals
      gsap.from('.process__step', {
        y: 40, opacity: 0, stagger: 0.2, duration: 0.8,
        scrollTrigger: { trigger: '.process__timeline', start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="process section" id="process" ref={sectionRef}>
      <div className="container">
        <div className="process__header">
          <span className="text-caption process__label">How We Work</span>
          <h2 className="process__heading text-h2">Our Process</h2>
        </div>

        <div className="process__timeline">
          <div className="process__line" ref={lineRef}></div>
          {STEPS.map(({ number, title, desc }, i) => (
            <div className={`process__step ${i % 2 === 0 ? 'process__step--left' : 'process__step--right'}`} key={number}>
              <span className="process__step-number">{number}</span>
              <div className="process__step-dot"></div>
              <div className="process__step-content">
                <h3 className="process__step-title">{title}</h3>
                <p className="process__step-desc text-body">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
