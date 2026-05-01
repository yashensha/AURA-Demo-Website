import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.contact__left > *', {
        x: -40, opacity: 0, stagger: 0.12, duration: 0.8,
        scrollTrigger: { trigger: '.contact__grid', start: 'top 75%' },
      })
      gsap.from('.contact__right > *', {
        x: 40, opacity: 0, stagger: 0.12, duration: 0.8,
        scrollTrigger: { trigger: '.contact__grid', start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left">
            <span className="text-caption">Get in Touch</span>
            <h2 className="contact__heading text-h1">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-body">
              Every great space begins with a conversation. Tell us about your
              vision, and we'll show you what's possible.
            </p>
            <a href="mailto:hello@aurainteriors.in" className="btn-gold">
              Book a Consultation
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact__right">
            <div className="contact__info">
              <div className="contact__info-item">
                <Phone size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Phone</span>
                  <a href="tel:+914842345678">+91 484 234 5678</a>
                </div>
              </div>
              <div className="contact__info-item">
                <Mail size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Email</span>
                  <a href="mailto:hello@aurainteriors.in">hello@aurainteriors.in</a>
                </div>
              </div>
              <div className="contact__info-item">
                <MapPin size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Studio</span>
                  <p>Door No. 42/1, Bristow Road<br />Fort Kochi, Kerala 682001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
