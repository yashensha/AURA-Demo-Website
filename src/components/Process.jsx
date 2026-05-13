import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { number: '01', title: 'Consultation', desc: 'We understand your project — the space, the climate, the use. Whether residential or commercial, we match you with the right Zohaland material solution.' },
  { number: '02', title: 'Specification', desc: 'Our team prepares a full material specification: product codes, quantities, technical data sheets, and installation guidelines tailored to your site.' },
  { number: '03', title: 'Delivery', desc: 'Products sourced from our Perumbavoor factory and dispatched to your site. Tight lead times, rigorous QC — every board and plank inspected before it ships.' },
  { number: '04', title: 'Installation', desc: 'Our partner craftsmen install to specification. Minimalist by design, every Zohaland product is engineered for clean, efficient on-site assembly.' },
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
          <h2 className="process__heading text-h2">From Specification to Installation</h2>
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
