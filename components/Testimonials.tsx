'use client'

import { useState } from 'react'

interface Testimonial {
  name: string
  nickname: string
  location: string
  quote: string
  traits: string[]
  emoji: string
  bgColor: string
  secretMessage?: string
}

function TestimonialModal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-center animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
          A Special Message
        </h3>
        <p className="text-base text-foreground italic leading-relaxed mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const testimonials: Testimonial[] = [
  {
    name: 'Ray',
    nickname: 'Olu',
    location: 'East Legon, Accra',
    quote: 'funny, beautiful inside out, thoughtful, and easy to talk to. You are the kind of person who makes every conversation feel effortless. From the moment we met, something just felt different. I genuinely enjoy getting to know you, hearing your thoughts, and sharing little moments throughout the day. Your smile always seems to make things better, and somehow you\'ve become that one person I look forward to talking to more than I\'d like to admit. These past two weeks have been special, and I\'m excited to see where this journey takes us.',
    traits: ['Loyal', 'Funny', 'Deep', 'Real'],
    emoji: '👨',
    bgColor: 'from-primary/5 to-primary/10',
    secretMessage: 'You are my greatest blessing, and I cannot wait to build forever with you.',
  },
  {
    name: 'Teena',
    nickname: 'Baby Tee',
    location: 'Adutwumwaa Hostel, Kumasi',
    quote: 'Peaceful, wise, beautiful soul. A heart that feels everything. You brought sunshine into my life when I needed it most. Every moment with you feels like a blessing, and I thank the universe for you every single day.',
    traits: ['Peaceful', 'Wise', 'Beautiful', 'Kind'],
    emoji: '👩',
    bgColor: 'from-accent/5 to-accent/10',
    secretMessage: 'Go ahead, my dear. There\'s something in there that belongs to you.',
  },
]

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            What We Think of <span className="text-gradient">Each Other</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Words from the heart about the people we love most
          </p>
        </div>

        {/* Desktop view - Side by side */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${testimonial.bgColor} border border-border rounded-lg p-6 glow-hover`}
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-3 -right-3 text-4xl opacity-20 text-primary">"</div>

              {/* Profile section */}
              <div className="mb-4">
                <div className="text-3xl mb-2">{testimonial.emoji}</div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-1">{testimonial.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">"{testimonial.nickname}"</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {testimonial.location}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mb-4 space-y-2">
                <p className="text-sm text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
              </blockquote>

              {/* Traits */}
              <div className="flex flex-wrap gap-2 mb-3">
                {testimonial.traits.map((trait, traitIndex) => (
                  <span
                    key={traitIndex}
                    className="bg-white border border-border text-foreground px-2 py-1 rounded-full text-xs font-medium hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Secret Message Button */}
              {testimonial.secretMessage && (
                <button
                  onClick={() => {
                    setModalMessage(testimonial.secretMessage || '')
                    setShowModal(true)
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105 mb-3"
                >
                  Reveal Secret
                </button>
              )}

              {/* Heart */}
              <div className="absolute bottom-3 right-3 text-xl heart-pulse">❤️</div>
            </div>
          ))}
        </div>

        {/* Mobile view - Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div
              className={`bg-gradient-to-br ${testimonials[activeTestimonial].bgColor} border border-border rounded-lg p-6 glow-hover min-h-80`}
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-3 -right-3 text-4xl opacity-20 text-primary">"</div>

              {/* Profile section */}
              <div className="mb-4">
                <div className="text-3xl mb-2">{testimonials[activeTestimonial].emoji}</div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-1">{testimonials[activeTestimonial].name}</h3>
                <p className="text-xs text-muted-foreground mb-1">"{testimonials[activeTestimonial].nickname}"</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {testimonials[activeTestimonial].location}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mb-4 space-y-2">
                <p className="text-sm text-foreground italic leading-relaxed">"{testimonials[activeTestimonial].quote}"</p>
              </blockquote>

              {/* Traits */}
              <div className="flex flex-wrap gap-2 mb-3">
                {testimonials[activeTestimonial].traits.map((trait, traitIndex) => (
                  <span
                    key={traitIndex}
                    className="bg-white border border-border text-foreground px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Secret Message Button */}
              {testimonials[activeTestimonial].secretMessage && (
                <button
                  onClick={() => {
                    setModalMessage(testimonials[activeTestimonial].secretMessage || '')
                    setShowModal(true)
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105 mb-3"
                >
                  Reveal Secret
                </button>
              )}

              {/* Heart */}
              <div className="text-xl heart-pulse">❤️</div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTestimonial === index ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Love declaration */}
        <div className="mt-12 text-center">
          <div className="bg-white border border-border rounded-lg p-6 glow-hover max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-heading font-bold text-foreground mb-3">
              "The world may keep us apart for now, but I&apos;d love to call you mine."
            </p>
            <p className="text-sm text-muted-foreground">
              Distance measured in miles. Feelings measured in forever. ❤️
            </p>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <TestimonialModal 
            message={modalMessage} 
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </section>
  )
}
