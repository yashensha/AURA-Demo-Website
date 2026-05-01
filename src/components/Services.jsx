import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PenTool, Layers, Palette, MessageSquare } from 'lucide-react'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: PenTool,
    title: 'Residential Design',
    description: 'Complete interior design for luxury villas, apartments, and private residences across Kerala.',
  },
  {
    icon: Layers,
    title: 'Renovation',
    description: 'Transforming existing spaces with a fresh design perspective while preserving architectural character.',
  },
  {
    icon: Palette,
    title: 'Styling & Staging',
    description: 'Curated furniture, art, and accessories that bring a designed space to life with personality.',
  },
  {
    icon: MessageSquare,
    title: 'Design Consultation',
    description: 'Expert guidance on materials, layouts, and design direction for homeowners and architects.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.services__label', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.services__label', start: 'top 85%' },
      })
      gsap.from('.services__heading', {
        y: 30, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.services__heading', start: 'top 85%' },
      })
      gsap.from('.services__card', {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.8,
        scrollTrigger: { trigger: '.services__grid', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="services section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services__header">
          <span className="text-caption services__label">What We Do</span>
          <h2 className="services__heading text-h2">
            Services Tailored to Distinction
          </h2>
        </div>

        <div className="services__grid">
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <article className="services__card" key={i}>
              <div className="services__card-icon">
                <Icon size={28} strokeWidth={1} />
              </div>
              <h3 className="services__card-title">{title}</h3>
              <p className="services__card-desc text-body">{description}</p>
              <div className="services__card-line"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
