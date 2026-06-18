'use client'

import { useState } from 'react'
import Image from 'next/image'

function ProposalButton() {
  const [showPopup, setShowPopup] = useState(false)

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPopup(false)
  }

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="w-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105"
      >
        View Proposal
      </button>

      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-64">
              <Image
                src="/couple-journey.jpeg"
                alt="Will you be my girlfriend?"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                She&apos;s Said YES! ❤️
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                June 16th - The day that changed everything
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface TimelineEvent {
  date: string
  day: number
  title: string
  description: string
  icon: string
  hasProposal?: boolean
}

const events: TimelineEvent[] = [
  {
    date: 'June 4',
    day: 1,
    title: 'The Beginning',
    description: 'The night we met. A simple moment that changed everything.',
    icon: '✨',
  },
  {
    date: 'June 5',
    day: 2,
    title: 'First Connection',
    description: 'Getting to know each other, laughing and sharing dreams.',
    icon: '💭',
  },
  {
    date: 'June 7',
    day: 4,
    title: 'Growing Closer',
    description: 'Every moment together feels like home.',
    icon: '🌿',
  },
  {
    date: 'June 10',
    day: 7,
    title: 'One Week Strong',
    description: 'A week of pure joy, laughter, and unforgettable memories.',
    icon: '⭐',
  },
  {
    date: 'June 14',
    day: 11,
    title: 'Distance, No Barrier',
    description: 'Miles apart but hearts forever connected.',
    icon: '🌍',
  },
  {
    date: 'June 16',
    day: 13,
    title: 'The Question',
    description: 'A moment we\'ll never forget. Will you be my girlfriend?',
    icon: '💫',
    hasProposal: true,
  },
  {
    date: 'June 18',
    day: 15,
    title: 'Two Weeks of Love',
    description: 'Here we are, stronger than ever. The best is yet to come.',
    icon: '❤️',
  },
]

const getSegmentEmoji = (fromIndex: number) => {
  if (fromIndex === 0) return '❤️' // The Beginning -> First Connection
  if (fromIndex === 1) return '💖' // First Connection -> Growing Closer (Transition)
  if (fromIndex === 2) return '💙' // Growing Closer -> One Week Strong
  return '❤️' // One Week Strong -> Two Weeks of Love
}

export default function Timeline() {
  const [activeDay, setActiveDay] = useState(events.length - 1)

  return (
    <section id="moments" className="py-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Our Journey in <span className="text-gradient">Moments</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            From June 4th to today - 2 weeks of beautiful memories
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline events */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="w-1/2 pr-8 flex items-center">
                    <div className="bg-white border border-border rounded-lg p-5 glow-hover w-full">
                      <div className="text-2xl mb-2">{event.icon}</div>
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-2">
                        Day {event.day}
                      </div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1 italic">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                      <p className="text-xs text-foreground mb-3">{event.description}</p>
                      {event.hasProposal && <ProposalButton />}
                    </div>
                  </div>

                  {/* Timeline dot and love emoji map lines */}
                  <div className="relative w-0 flex justify-center items-center">
                    {/* Top-half connector from previous event */}
                    {index > 0 && (
                      <div className="absolute top-[-24px] bottom-[20px] left-1/2 -translate-x-1/2 w-4 flex flex-col justify-around items-center pointer-events-none z-0">
                        <span className="text-[10px] opacity-75 heart-pulse">
                          {getSegmentEmoji(index - 1)}
                        </span>
                        <span className="text-[10px] opacity-75 heart-pulse" style={{ animationDelay: '0.15s' }}>
                          {getSegmentEmoji(index - 1)}
                        </span>
                        <span className="text-[10px] opacity-75 heart-pulse" style={{ animationDelay: '0.3s' }}>
                          {getSegmentEmoji(index - 1)}
                        </span>
                      </div>
                    )}

                    {/* Main heart representing the event */}
                    <div className="text-2xl heart-pulse z-10 bg-background/95 p-1 rounded-full select-none shadow-sm border border-border/50">
                      {index <= 1 ? '❤️' : (index <= 3 ? '💙' : '❤️')}
                    </div>

                    {/* Bottom-half connector to next event */}
                    {index < events.length - 1 && (
                      <div className="absolute top-[20px] bottom-[-24px] left-1/2 -translate-x-1/2 w-4 flex flex-col justify-around items-center pointer-events-none z-0">
                        <span className="text-[10px] opacity-75 heart-pulse" style={{ animationDelay: '0.45s' }}>
                          {getSegmentEmoji(index)}
                        </span>
                        <span className="text-[10px] opacity-75 heart-pulse" style={{ animationDelay: '0.6s' }}>
                          {getSegmentEmoji(index)}
                        </span>
                        <span className="text-[10px] opacity-75 heart-pulse" style={{ animationDelay: '0.75s' }}>
                          {getSegmentEmoji(index)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Empty space */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-3 snap-x">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`flex-shrink-0 snap-center px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeDay === index
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
              >
                Day {event.day}
              </button>
            ))}
          </div>

          {/* Active event details */}
          <div className="bg-white border border-border rounded-lg p-5 glow-hover">
            <div className="text-2xl mb-2">{events[activeDay].icon}</div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-1 italic">{events[activeDay].title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{events[activeDay].date}</p>
            <p className="text-xs text-foreground mb-3">{events[activeDay].description}</p>
            {events[activeDay].hasProposal && <ProposalButton />}
          </div>
        </div>
      </div>
    </section>
  )
}
