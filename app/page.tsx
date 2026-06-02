'use client'

import { useEffect, useState } from 'react'

interface Booking {
  name: string
  phone: string
  email: string
  date: string
  time: string
  service: string
}

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [msg, setMsg] = useState('')
  const [lbOpen, setLbOpen] = useState(false)
  const [lbSrc, setLbSrc] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ys_bookings') || '[]')
    setBookings(data)
  }, [])

  const handleGalleryClick = (src: string) => {
    setLbSrc(src)
    setLbOpen(true)
  }

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const booking: Booking = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      time: (form.elements.namedItem('time') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
    }
    const updated = [...bookings, booking]
    setBookings(updated)
    localStorage.setItem('ys_bookings', JSON.stringify(updated))
    setMsg('Request saved. I will reach out within 24 hours.')
    form.reset()
    setTimeout(() => setMsg(''), 4000)
  }

  const deleteBooking = (idx: number) => {
    const updated = bookings.filter((_, i) => i !== idx)
    setBookings(updated)
    localStorage.setItem('ys_bookings', JSON.stringify(updated))
  }

  const galleryImages = [
    '/images/job1.jpg',
    '/images/job2.jpg',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%238f8f8f"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%23222">Sealing Job 3</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%237b7b7b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%230f0f0f">Sealing Job 4</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%236b6b6b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%230000">Sealing Job 5</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%235a5a5a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%230000">Sealing Job 6</text></svg>',
  ]

  return (
    <>
      <header className="site-header">
        <div className="container">
          <h1 className="brand">York Sealing Solutions</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#gallery">Galleries</a>
            <a href="#booking">Booking</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="contact-quick">
            <a className="phone" href="tel:+19057260187">+1 (905) 726-0187</a>
            <a className="email" href="mailto:contact@yorksealing.com">contact@yorksealing.com</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero grayscale">
          <div className="container">
            <h2>Professional Sealing & Weatherproofing Services</h2>
            <p className="lead">Trusted local expert with 10+ years of experience keeping homes protected</p>
            <a className="btn" href="#booking">Get a quote</a>
          </div>
        </section>

        <section id="about" className="about container grayscale">
          <h3>Who I Am</h3>
          <p>I'm Zsombor, and I've been helping homeowners and businesses throughout York protect their properties with quality sealing and weatherproofing work. Whether it's windows, doors, or complex building sealing, I take pride in clean, lasting results that stand the test of time.</p>
          <ul>
            <li>Residential sealing and caulking</li>
            <li>Commercial weatherproofing projects</li>
            <li>Fully insured and experienced</li>
          </ul>
        </section>

        <section id="gallery" className="gallery container grayscale">
          <h3>Galleries</h3>
          <div className="grid">
            {galleryImages.map((src, i) => (
              <img
                key={i}
                className="thumb"
                src={src}
                alt={`Job ${i + 1}`}
                onClick={() => handleGalleryClick(src)}
              />
            ))}
          </div>
        </section>

        <section id="booking" className="booking container grayscale">
          <h3>Booking</h3>
          <form onSubmit={handleBookingSubmit} className="form">
            <label>
              Full name
              <input type="text" name="name" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" required />
            </label>
            <label>
              Email
              <input type="email" name="email" />
            </label>
            <label>
              Date
              <input type="date" name="date" required />
            </label>
            <label>
              Time
              <input type="time" name="time" required />
            </label>
            <label>
              Service
              <select name="service" required>
                <option>Window & door sealing</option>
                <option>Roof flashing & repair</option>
                <option>Commercial caulking</option>
                <option>Inspection & maintenance</option>
              </select>
            </label>
            <button type="submit" className="btn">Request Booking</button>
            {msg && <p className="muted">{msg}</p>}
          </form>
          <div className="bookings-list">
            <h4>Saved requests</h4>
            <ul>
              {bookings.map((b, idx) => (
                <li key={idx}>
                  {b.date} {b.time} - {b.name} ({b.phone}) - {b.service}
                  <button
                    onClick={() => deleteBooking(idx)}
                    style={{ marginLeft: '8px', padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact container grayscale">
          <h3>Get In Touch</h3>
          <p><strong>Zsombor</strong></p>
          <p>York Sealing Solutions</p>
          <p><a href="tel:+19057260187">(905) 726-0187</a></p>
          <p><a href="mailto:contact@yorksealing.com">contact@yorksealing.com</a></p>
        </section>
      </main>

      {lbOpen && (
        <div
          className="lightbox"
          onClick={() => setLbOpen(false)}
          role="dialog"
          aria-hidden={!lbOpen}
        >
          <button
            className="lb-close"
            onClick={() => setLbOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <img className="lb-img" src={lbSrc} alt="Full view" />
        </div>
      )}

      <footer className="site-footer grayscale">
        <div className="container">
          <small>© York Sealing Solutions</small>
        </div>
      </footer>
    </>
  )
}
