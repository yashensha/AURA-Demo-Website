import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'ÀURA transformed our home into something we never imagined possible. Every room tells a story, every corner has intention.',
    name: 'Priya & Arjun Menon',
    location: 'Edappally, Kochi',
  },
  {
    quote: 'Working with ÀURA was effortless. They understood our vision before we could fully articulate it — and then exceeded it.',
    name: 'Dr. Suresh Nair',
    location: 'Kakkanad, Kochi',
  },
  {
    quote: 'The attention to detail is extraordinary. Two years later, our home still feels like it was completed yesterday.',
    name: 'Meera & Thomas Kurian',
    location: 'Fort Kochi',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.testimonials__label', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.testimonials__label', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate quote change
  useEffect(() => {
    if (!quoteRef.current) return
    const el = quoteRef.current
    gsap.fromTo(el, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
  }, [active])

  const t = TESTIMONIALS[active]

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <span className="text-caption testimonials__label">Client Words</span>

        <div className="testimonials__content">
          <Quote className="testimonials__icon" size={48} strokeWidth={0.5} />

          <div ref={quoteRef}>
            <blockquote className="testimonials__quote">{t.quote}</blockquote>
            <div className="testimonials__author">
              <span className="testimonials__name">{t.name}</span>
              <span className="testimonials__location">{t.location}</span>
            </div>
          </div>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
