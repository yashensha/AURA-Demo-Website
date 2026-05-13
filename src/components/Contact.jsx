import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, ArrowUpRight } from 'lucide-react'
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
              Ready to Build with Green Luxury?
            </h2>
            <p className="text-body">
              Every lasting space starts with the right material. Talk to our team
              about ZOHAWUD, ZOHADECK, or a custom Zohaland solution for your project.
            </p>
            <a href="tel:+917902966777" className="btn-gold">
              Call Our Studio
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact__right">
            <div className="contact__info">
              <div className="contact__info-item">
                <Phone size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Phone</span>
                  <a href="tel:+917902966777">+91 79029 66777</a>
                </div>
              </div>
              <div className="contact__info-item">
                <Phone size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Phone</span>
                  <a href="tel:+919895569377">+91 98955 69377</a>
                </div>
              </div>
              <div className="contact__info-item">
                <MapPin size={18} strokeWidth={1} className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Office</span>
                  <p>Room No. 41/847, Puthetath Building<br />NH Bypass, Padivattom, Ernakulam<br />Kochi, Kerala 682024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
