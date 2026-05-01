import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'The Malabar Residence',
    location: 'Fort Kochi',
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'Canopy House',
    location: 'Aluva, Kochi',
    category: 'Residence',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'Azure Penthouse',
    location: 'Marine Drive',
    category: 'Apartment',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18f6b6bd3?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'Verdant Villa',
    location: 'Kakkanad',
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'The Heritage Suite',
    location: 'Mattancherry',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80&auto=format&fit=crop',
  },
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isMobile = useRef(false)

  useEffect(() => {
    isMobile.current = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.portfolio__label', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.portfolio__label', start: 'top 85%' },
      })
      gsap.from('.portfolio__heading', {
        y: 30, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.portfolio__heading', start: 'top 85%' },
      })

      // Horizontal scroll — only on desktop
      if (!isMobile.current && trackRef.current) {
        const track = trackRef.current
        const cards = track.querySelectorAll('.portfolio__card')
        const totalWidth = track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: () => -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Card reveal
        cards.forEach((card) => {
          gsap.from(card, {
            scale: 0.9,
            opacity: 0.5,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'left 80%',
              end: 'left 50%',
              scrub: true,
              containerAnimation: gsap.getById && undefined,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="portfolio section" id="portfolio" ref={sectionRef}>
      <div className="portfolio__header container">
        <span className="text-caption portfolio__label">Selected Work</span>
        <h2 className="portfolio__heading text-h2">Projects</h2>
      </div>

      <div className="portfolio__track" ref={trackRef}>
        {PROJECTS.map(({ title, location, category, image }, i) => (
          <article className="portfolio__card" key={i}>
            <div className="portfolio__card-image">
              <img src={image} alt={`${title} — ${location}`} loading="lazy" />
            </div>
            <div className="portfolio__card-info">
              <span className="text-caption">{category}</span>
              <h3 className="portfolio__card-title">{title}</h3>
              <p className="portfolio__card-location">{location}</p>
            </div>
            <span className="portfolio__card-index">
              {String(i + 1).padStart(2, '0')}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
