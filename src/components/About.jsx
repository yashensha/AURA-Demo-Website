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
              Where Material Science Meets Living Design
            </h2>
            <div className="about__text text-body">
              <p>
                At Zohaland, we believe the finest interiors begin with the finest materials.
                Our Diatom Mud technology doesn't just look beautiful — it actively purifies
                your air, regulates humidity, and resists mold without a single chemical treatment.
              </p>
              <p>
                We don't follow design trends. We engineer material solutions that outlast them.
                Every product in our lineup — from ZOHAWUD to ZOHADECK — is built to a
                minimum 25-year performance standard, backed by independent testing.
              </p>
            </div>

            <div className="about__stats" ref={statsRef}>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="50">0</span>
                  <span className="about__stat-suffix">yr</span>
                </div>
                <span className="about__stat-label">Material Lifespan</span>
              </div>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="79">0</span>
                  <span className="about__stat-suffix">%</span>
                </div>
                <span className="about__stat-label">Stronger Than PVC</span>
              </div>
              <div className="about__stat">
                <div className="about__stat-row">
                  <span className="about__stat-number" data-target="3">0</span>
                  <span className="about__stat-suffix">+</span>
                </div>
                <span className="about__stat-label">Product Lines</span>
              </div>
            </div>
          </div>

          <div className="about__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop"
              alt="Elegant interior with Zohaland diatom mud wall panels and natural lighting"
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
