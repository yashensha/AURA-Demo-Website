import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'
import { ArrowDown } from 'lucide-react'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const headingRef = useRef(null)
  const captionRef = useRef(null)
  const sublineRef = useRef(null)
  const ctaRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Parallax on background image
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    // Character-by-character text reveal with Anime.js
    const heading = headingRef.current
    if (heading) {
      const text = heading.textContent
      heading.innerHTML = ''
      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.className = 'hero__char'
        span.textContent = char === ' ' ? '\u00A0' : char
        heading.appendChild(span)
      })

      animate('.hero__char', {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(35, { start: 600 }),
        duration: 800,
        ease: 'out(3)',
      })
    }

    // Caption gold line
    animate(lineRef.current, {
      width: ['0px', '60px'],
      delay: 300,
      duration: 1000,
      ease: 'inOut(3)',
    })

    // Caption text
    animate(captionRef.current, {
      opacity: [0, 1],
      translateY: [15, 0],
      delay: 400,
      duration: 800,
      ease: 'out(3)',
    })

    // Subline
    animate(sublineRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 1800,
      duration: 800,
      ease: 'out(3)',
    })

    // CTA
    animate(ctaRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 2200,
      duration: 800,
      ease: 'out(3)',
    })

    return () => ctx.revert()
  }, [])

  const handleExploreClick = (e) => {
    e.preventDefault()
    const portfolio = document.querySelector('#portfolio')
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero__image-wrap">
        <img
          ref={imageRef}
          className="hero__image"
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80&auto=format&fit=crop"
          alt="Luxury living room interior with warm lighting and modern furniture"
          loading="eager"
        />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__caption-row">
          <span className="hero__line" ref={lineRef}></span>
          <span className="text-caption" ref={captionRef} style={{ opacity: 0 }}>
            Luxury Interiors · Kochi
          </span>
        </div>

        <h1 className="hero__heading text-display" ref={headingRef}>
          Crafting Spaces That Speak
        </h1>

        <p className="hero__subline" ref={sublineRef} style={{ opacity: 0 }}>
          Where architecture meets artistry
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a href="#portfolio" className="btn-gold" onClick={handleExploreClick}>
            Explore Our Work
            <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}
