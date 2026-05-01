import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate } from 'animejs'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from('.about__label', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.about__label', start: 'top 85%' },
      })
      gsap.from('.about__heading', {
        y: 30, opacity: 0, duration: 1, delay: 0.2,
        scrollTrigger: { trigger: '.about__heading', start: 'top 85%' },
      })
      gsap.from('.about__text p', {
        y: 25, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.about__text', start: 'top 85%' },
      })

      // Image reveal with clip-path
      gsap.from('.about__image-wrap', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.about__image-wrap', start: 'top 80%' },
      })

      // Stats
      gsap.from('.about__stat', {
        y: 20, opacity: 0, stagger: 0.12, duration: 0.7,
        scrollTrigger: { trigger: '.about__stats', start: 'top 85%' },
      })
    }, sectionRef)

    // Counter animation for stats
    const statNumbers = statsRef.current?.querySelectorAll('.about__stat-number')
    if (statNumbers) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              statNumbers.forEach((el) => {
                const target = parseInt(el.dataset.target, 10)
                const obj = { val: 0 }
                animate(obj, {
                  val: target,
                  duration: 2000,
                  ease: 'inOut(3)',
                  onUpdate: () => {
                    el.textContent = Math.round(obj.val)
                  },
                })
              })
              observer.disconnect()
            }
          })
        },
        { threshold: 0.5 }
      )
      if (statsRef.current) observer.observe(statsRef.current)
    }

    return () => ctx.revert()
  }, [])

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <span className="text-caption about__label">Our Philosophy</span>
            <h2 className="about__heading text-h2">
              Design Is a Dialogue Between Space and Soul
            </h2>
            <div className="about__text text-body">
              <p>
                At ÀURA, we believe that exceptional interiors are born from understanding —
                understanding how light falls through a Kerala monsoon window, how a family
                gathers in the evening, how silence can be shaped by architecture.
              </p>
              <p>
                Our approach is deliberate. Every material is chosen with intention, every
                proportion calibrated to evoke calm and wonder. We don't follow trends —
                we craft environments that outlast them.
              </p>
            </div>

            <div className="about__stats" ref={statsRef}>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="15">0</span>
                  <span className="about__stat-suffix">+</span>
                </div>
                <span className="about__stat-label">Years</span>
              </div>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="200">0</span>
                  <span className="about__stat-suffix">+</span>
                </div>
                <span className="about__stat-label">Homes</span>
              </div>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="35">0</span>
                  <span className="about__stat-suffix">+</span>
                </div>
                <span className="about__stat-label">Awards</span>
              </div>
            </div>
          </div>

          <div className="about__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop"
              alt="Elegant interior design with natural materials and warm lighting"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
