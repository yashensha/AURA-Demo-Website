import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wind, Layers, Shield, MessageSquare } from 'lucide-react'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Wind,
    label: 'ZOHAWUD',
    title: 'Diatom Mud Boards',
    description: 'The board that breathes. Actively absorbs formaldehyde and VOCs, regulates humidity, and outlasts traditional PVC by 50+ years — with 79% higher screw-holding strength.',
  },
  {
    icon: Layers,
    label: 'ZOHADECK',
    title: 'WPC Composite Flooring',
    description: 'ASA co-extruded surfaces built for 25 years of extremes. UV-stable, waterproof, and slip-resistant — from beachside villas to rooftop terraces.',
  },
  {
    icon: Shield,
    label: 'ZOHAWALL',
    title: 'Wall Cladding Systems',
    description: 'Precision-engineered wall panels that marry material science with refined aesthetics. Durable, moisture-resistant, and designed to elevate every surface.',
  },
  {
    icon: MessageSquare,
    label: 'Design Studio',
    title: 'Material Consultation',
    description: 'Expert guidance on choosing the right Zohaland material for your project. From specification sheets to on-site walkthroughs — we architect the brief alongside you.',
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
          <span className="text-caption services__label">Our Product Lines</span>
          <h2 className="services__heading text-h2">
            Engineered for Green Luxury
          </h2>
        </div>

        <div className="services__grid">
          {SERVICES.map(({ icon: Icon, label, title, description }, i) => (
            <article className="services__card" key={i}>
              <div className="services__card-icon">
                <Icon size={28} strokeWidth={1} />
              </div>
              <span className="services__card-label">{label}</span>
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
