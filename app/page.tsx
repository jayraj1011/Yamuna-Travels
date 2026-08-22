'use client'

import { FormEvent, ReactNode, useMemo, useState } from 'react'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight, Check, Compass, Headphones, MapPin,
  Menu, MessageCircle, Navigation, Phone, Plane, ShieldCheck, Sparkles,
  TrainFront, Users, X, CarFront, CalendarDays
} from 'lucide-react'

const business = { name: 'Yamuna Travels', phone: '+91 9540504074', whatsapp: '919540504074', location: 'Delhi/NCR', area: 'North India', tagline: 'Reliable Rides. Comfortable Journeys.' }
const travelTypes = ['Outstation One Way', 'Outstation Round Trip', 'Local / Delhi NCR', 'Airport Transfer', 'Railway Station Transfer', 'Corporate Travel', 'Wedding / Event Travel']
const vehicles = ['Dzire (4+1)', 'Aura (4+1)', 'Ertiga (6+1)', 'Innova (6+1)', 'Innova Crysta (6+1/7+1)', 'Kia Carens (6+1)', 'Tempo Traveller (12 Seater)', 'Tempo Traveller (16 Seater)', 'Tempo Traveller (26 Seater)']
const services: [string, string, LucideIcon][] = [
  ['Outstation One Way', 'Comfortable point-to-point rides across North India.', Navigation], ['Outstation Round Trip', 'Plan a return journey with a vehicle that fits your route.', Compass], ['Local / Delhi NCR', 'Dependable rides for city errands, meetings and days out.', MapPin], ['Airport Transfers', 'Easy, timely transfers to and from Delhi airports.', Plane], ['Railway Station Transfers', 'A smooth start or finish to your rail journey.', TrainFront], ['Corporate Travel', 'Professional transport for teams, clients and business trips.', ShieldCheck], ['Wedding & Event Travel', 'Thoughtful guest and group transportation for your occasion.', Sparkles], ['Tempo Traveller / Group Travel', 'Make group journeys comfortable from the first kilometre.', Users],
]
const routes = ['Delhi → Jaipur', 'Delhi → Agra', 'Delhi → Haridwar', 'Delhi → Rishikesh', 'Delhi → Chandigarh', 'Delhi → Amritsar', 'Delhi → Manali', 'Delhi → Dehradun', 'Delhi → Mathura / Vrindavan']
const fleet: [string, string, string][] = [
  ['Dzire/Aura', '4+1', '/images/aura-dzire.png'],  ['Ertiga', '6+1', '/images/ertiga.png'], ['Innova Hycross', '6+1', '/images/hycross.png'], ['Innova Crysta', '6+1/7+1', '/images/crysta.png'], ['Hatchback', '4+1', '/images/swift.png'], ['Tempo Traveller', '12/16/26 Seater', '/images/tempotraveller.png'],
]
const benefits: [string, string, LucideIcon][] = [['Comfortable Travel', 'Thoughtfully matched vehicles for relaxed journeys.', CarFront], ['Multiple Vehicle Options', 'Choose from cars and group-ready Tempo Travellers.', Users], ['Flexible Travel Options', 'One-way, round trips, local and event travel.', Compass], ['Easy Booking', 'Share your journey details and we will take it from there.', Check], ['Personalized Assistance', 'Clear, friendly help as you plan your ride.', Headphones], ['North India Travel', 'Routes across Delhi/NCR and nearby North Indian destinations.', MapPin]]
const testimonials = [['Aarav Mehta', 'The enquiry process was simple and the vehicle suggestion was helpful.'], ['Simran Kaur', 'A comfortable way to plan our family trip from Delhi.'], ['Rohan Sharma', 'Clear communication made our airport transfer easy to arrange.']] as const
const heroImage = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=78'
const aboutImage = 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=85'
const defaultWhatsAppMessage = 'Hello, I want to book a cab with Yamuna Travels.'
const emptyForm = { name: '', phone: '', pickup: '', drop: '', date: '', vehicle: '', passengers: '', type: '' }
const phoneHref = `tel:${business.phone.replaceAll(' ', '')}`

function whatsappHref(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}

function buildEnquiryMessage(form: typeof emptyForm) {
  return [
    'Hello Yamuna Travels,',
    '',
    'I would like to enquire about a cab booking.',
    '',
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Pickup: ${form.pickup.trim()}`,
    `Drop: ${form.drop.trim()}`,
    `Travel Date: ${form.date}`,
    `Number of Passengers: ${form.passengers}`,
    `Vehicle: ${form.vehicle}`,
    `Travel Type: ${form.type}`,
    '',
    'Please get in touch to discuss availability and fare.',
  ].join('\n')
}

function WhatsAppLink({ children, className = '', message = defaultWhatsAppMessage }: { children: ReactNode, className?: string, message?: string }) {
  return (
    <a className={className} href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={17} aria-hidden="true" />
      {children}
    </a>
  )
}

function BookingForm() {
  const [awaitingWhatsApp, setAwaitingWhatsApp] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const enquiryMessage = useMemo(() => buildEnquiryMessage(form), [form])
  const enquiryHref = whatsappHref(enquiryMessage)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.phone.trim() || !form.pickup.trim() || !form.drop.trim() || !form.date || !form.passengers || !form.vehicle || !form.type) {
      setError('Please fill in all required fields.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    const passengers = Number(form.passengers)
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 50) {
      setError('Please enter a valid number of passengers (1–50).')
      return
    }

    const opened = window.open(enquiryHref, '_blank', 'noopener,noreferrer')
    if (!opened) {
      window.location.assign(enquiryHref)
      return
    }
    setAwaitingWhatsApp(true)
  }

  if (awaitingWhatsApp) {
    return (
      <div className="success-panel" role="status" aria-live="polite">
        <div className="success-icon"><MessageCircle aria-hidden="true" /></div>
        <h3>Send on WhatsApp</h3>
        <p>Your enquiry details are ready. WhatsApp should open with a prefilled message. If it did not open, tap the button below to send it.</p>
        <WhatsAppLink className="button button-teal" message={enquiryMessage}>Open WhatsApp</WhatsAppLink>
        <a className="text-link" href={phoneHref}><Phone size={16} aria-hidden="true" /> Call {business.phone}</a>
        <button type="button" className="reset-link" onClick={() => setAwaitingWhatsApp(false)}>Edit enquiry details</button>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Quick enquiry</span>
        <h3>Let&apos;s plan your ride</h3>
        <p>Share a few details. We&apos;ll help you choose the right vehicle and option.</p>
      </div>
      <div className="field-grid">
        <label>Full Name<input required name="name" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
        <label>Contact Number<input required name="phone" type="tel" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></label>
        <label>Pickup Location<input required name="pickup" autoComplete="address-line1" value={form.pickup} onChange={e => setForm({ ...form, pickup: e.target.value })} placeholder="Where from?" /></label>
        <label>Drop Location<input required name="drop" autoComplete="address-line2" value={form.drop} onChange={e => setForm({ ...form, drop: e.target.value })} placeholder="Where to?" /></label>
        <label>Travel Date<input required name="travel-date" type="date" autoComplete="off" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
        <label>Number of Passengers<input required name="passengers" type="number" min="1" max="50" inputMode="numeric" autoComplete="off" value={form.passengers} onChange={e => setForm({ ...form, passengers: e.target.value })} placeholder="How many travelling?" /></label>
        <label>Select Vehicle<select required name="vehicle" autoComplete="off" value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })}><option value="">Choose vehicle</option>{vehicles.map(v => <option key={v}>{v}</option>)}</select></label>
      </div>
      <label>Travel Type<select required name="travel-type" autoComplete="off" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="">What kind of journey?</option>{travelTypes.map(v => <option key={v}>{v}</option>)}</select></label>
      <div className="form-status" aria-live="polite">{error && <p className="form-error" role="alert">{error}</p>}</div>
      <button className="button button-navy submit-button" type="submit">Send booking enquiry<ArrowRight size={17} aria-hidden="true" /></button>
    </form>
  )
}

export default function Page() {
  const [menu, setMenu] = useState(false)
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home">
            <Image src="/logo.png" alt="Yamuna Travels" width={1376} height={768} className="brand-logo" priority sizes="(max-width: 340px) 96px, (max-width: 390px) 108px, (max-width: 600px) 128px, 168px" />
          </a>
          <nav id="site-nav" className={menu ? 'nav-links open' : 'nav-links'}>
            {['Home', 'Services', 'Fleet', 'Routes', 'About', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
            <a className="nav-book" href="#book" onClick={() => setMenu(false)}>Book a Cab</a>
            <a className="nav-call" href={phoneHref}><Phone size={15} aria-hidden="true" /> Call Now</a>
          </nav>
          <button type="button" className="menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="site-nav" onClick={() => setMenu(!menu)}>{menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </header>
      <main id="main-content">
        <section id="home" className="hero">
          <div className="hero-image">
            <Image className="hero-photo" src={heroImage} alt="Coach travelling on an open highway" fill priority sizes="(max-width: 900px) 100vw, 62vw" quality={78} />
          </div>
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow light">DELHI / NCR · NORTH INDIA</p>
              <h1>Reliable Rides.<br /><em>Comfortable Journeys.</em></h1>
              <p className="hero-lede">Travel with ease across Delhi/NCR and North India with a vehicle that suits your journey.</p>
              <div className="hero-actions">
                <a className="button button-teal" href="#book">Book a Cab <ArrowRight size={17} aria-hidden="true" /></a>
                <WhatsAppLink className="button button-ghost">WhatsApp Us</WhatsAppLink>
              </div>
              <div className="hero-note">
                <span><ShieldCheck size={17} aria-hidden="true" /> Comfortable travel</span>
                <span><MapPin size={17} aria-hidden="true" /> North India coverage</span>
              </div>
            </div>
            <div id="book" className="booking-card"><BookingForm /></div>
          </div>
        </section>
        <section className="trust-strip">
          <div className="container trust-items">
            <span><CarFront aria-hidden="true" /> Comfortable Vehicles</span>
            <span><ShieldCheck aria-hidden="true" /> Professional Service</span>
            <span><Compass aria-hidden="true" /> Flexible Travel Options</span>
            <span><MapPin aria-hidden="true" /> North India Coverage</span>
          </div>
        </section>
        <section id="services" className="section section-ivory">
          <div className="container">
            <div className="section-intro"><div><p className="eyebrow">What we arrange</p><h2>Travel made <em>simple.</em></h2></div><p>From a local ride to a multi-day North India journey, choose the service that fits your plans.</p></div>
            <div className="service-grid">{services.map(([title, desc, Icon]) => <article className="service-card" key={title}><div className="icon-box"><Icon size={21} aria-hidden="true" /></div><h3>{title}</h3><p>{desc}</p><a href="#book">Get started <ArrowRight size={15} aria-hidden="true" /></a></article>)}</div>
          </div>
        </section>
        <section id="routes" className="section route-section">
          <div className="container">
            <div className="section-intro light-intro"><div><p className="eyebrow light">Go further</p><h2>Popular <em>routes.</em></h2></div><p>Planning a familiar favourite or somewhere new? Tell us your route for a tailored quote.</p></div>
            <div className="route-grid">{routes.map((route, i) => <a className="route-card" href="#book" key={route}><span className="route-number">0{i + 1}</span><span><strong>{route}</strong><small>Contact for price</small></span><ArrowRight size={18} aria-hidden="true" /></a>)}</div>
          </div>
        </section>
        <section id="fleet" className="section section-ivory">
          <div className="container">
            <div className="section-intro"><div><p className="eyebrow">Choose your comfort</p><h2>A fleet for <em>every plan.</em></h2></div><p>Browse our vehicle options and tell us what feels right for your group and route.</p></div>
            <div className="fleet-grid">{fleet.map(([name, seats, image]) => (
              <article className="fleet-card" key={`${name}-${seats}`}>
                <div className="fleet-photo">
                  <Image src={image} alt="" fill sizes="(max-width: 390px) 100vw, (max-width: 900px) 50vw, 370px" />
                </div>
                <div><h3>{name}</h3><span>{seats}</span></div>
              </article>
            ))}</div>
          </div>
        </section>
        <section className="coverage-section">
          <div className="container coverage-inner">
            <div>
              <p className="eyebrow light">Where we go</p>
              <h2>North India,<br /><em>your way.</em></h2>
              <p>Serving journeys around Delhi/NCR and destinations across Rajasthan, Uttar Pradesh, Uttarakhand, Haryana, Punjab, Himachal Pradesh, Chandigarh and nearby North Indian destinations.</p>
              <a className="button button-teal" href="#book">Plan your route <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="coverage-map" aria-hidden="true">
              <div className="map-line line-one" /><div className="map-line line-two" />
              <div className="map-pin pin-delhi"><span>Delhi/NCR</span></div>
              <div className="map-pin pin-north"><span>North India</span></div>
              <div className="map-caption">Flexible routes<br />Clear conversations</div>
            </div>
          </div>
        </section>
        <section className="section section-ivory">
          <div className="container">
            <div className="section-intro"><div><p className="eyebrow">The Yamuna way</p><h2>Made for the<br /><em>journey ahead.</em></h2></div><p>A considered travel experience starts with listening to what you need.</p></div>
            <div className="benefit-grid">{benefits.map(([title, desc, Icon]) => <article className="benefit" key={title}><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
          </div>
        </section>
        <section className="process-section">
          <div className="container">
            <div className="section-intro light-intro"><div><p className="eyebrow light">A clear start</p><h2>From enquiry<br />to <em>journey.</em></h2></div><p>We keep the planning simple and transparent. The fare is discussed with you after we understand your route.</p></div>
            <div className="process-grid">{[['01', 'Submit Enquiry', 'Tell us your pickup, destination and preferences.'], ['02', 'We Contact You', 'We connect to confirm the details of your journey.'], ['03', 'Discuss Vehicle & Fare', 'Together, we find the right vehicle and agree the fare.'], ['04', 'Confirm Your Journey', 'Your travel plans are ready to go.']].map(([num, title, desc]) => <div className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-photo">
              <Image src={aboutImage} alt="A road winding through a North Indian landscape" fill sizes="(max-width: 900px) 100vw, 580px" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">About Yamuna Travels</p>
              <h2>Good journeys<br /><em>start here.</em></h2>
              <p>Yamuna Travels helps you arrange convenient cab travel from Delhi/NCR across North India. Whether you need a local ride, an airport or railway transfer, an outstation trip, or space for a group, we focus on making the booking conversation clear and comfortable.</p>
              <p>Tell us where you are going, and we&apos;ll help you think through the right vehicle and travel option.</p>
              <a className="text-link" href="#book">Start a conversation <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section className="section section-ivory testimonials">
          <div className="container">
            <div className="section-intro"><div><p className="eyebrow">What Our Customers Say</p><h2>Real journeys.<em>Real experiences.</em></h2></div></div>
            <div className="testimonial-grid">{testimonials.map(([name, quote]) => (
  <article key={name} className="testimonial">
    <p>"{quote}"</p>
    <strong>{name}</strong>
    <small>Customer review</small>
  </article>
))}</div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-inner">
            <div><p className="eyebrow light">Let&apos;s talk travel</p><h2>Ready when<br /><em>you are.</em></h2></div>
            <div className="contact-details">
              <p>Yamuna Travels<br /><span>Delhi/NCR</span></p>
              <a href={phoneHref} className="contact-phone">{business.phone}</a>
              <div className="contact-actions">
                <a className="button button-ivory" href={phoneHref}><Phone size={17} aria-hidden="true" /> Call Now</a>
                <WhatsAppLink className="button button-outline">WhatsApp</WhatsAppLink>
              </div>
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="container final-inner">
            <div>
              <p className="eyebrow">Your next chapter</p>
              <h2>Planning Your Next <em>Journey?</em></h2>
              <p>Tell us where you want to go. We&apos;ll help you choose the right vehicle and travel option.</p>
            </div>
            <div className="hero-actions">
              <a className="button button-navy" href="#book">Book a Cab <ArrowRight size={17} aria-hidden="true" /></a>
              <WhatsAppLink className="button button-outline-navy">WhatsApp Us</WhatsAppLink>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <Image src="/logo.png" alt="Yamuna Travels" width={1376} height={768} className="brand-logo" sizes="140px" />
            </a>
            <p>Comfortable cab travel from Delhi/NCR across North India.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#services">Services</a>
            <a href="#fleet">Fleet</a>
            <a href="#routes">Routes</a>
            <a href="#about">About</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={phoneHref}>{business.phone}</a>
            <a href={whatsappHref(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="#book">Book a Cab</a>
          </div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Yamuna Travels</span><span>Delhi/NCR · North India</span></div>
      </footer>
      <div className="mobile-actions">
        <a href={phoneHref}><Phone size={17} aria-hidden="true" /> Call</a>
        <a href="#book"><CalendarDays size={17} aria-hidden="true" /> Book a Cab</a>
        <WhatsAppLink>WhatsApp</WhatsAppLink>
      </div>
    </>
  )
}
