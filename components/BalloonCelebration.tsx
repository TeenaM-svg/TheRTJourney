'use client'

import { useEffect, useState, useRef } from 'react'

export default function BalloonCelebration() {
  const [showCelebration, setShowCelebration] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const triggerCelebration = () => {
    setShowCelebration(true)
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = setTimeout(() => {
      setShowCelebration(false)
    }, 3500)
  }

  useEffect(() => {
    // Show celebration on page load
    const showTimer = setTimeout(() => {
      triggerCelebration()
    }, 300)

    const handleTrigger = () => {
      triggerCelebration()
    }

    window.addEventListener('trigger-balloon-celebration', handleTrigger)

    return () => {
      clearTimeout(showTimer)
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
      window.removeEventListener('trigger-balloon-celebration', handleTrigger)
    }
  }, [])

  return (
    <>
      {/* Floating Celebrate Button */}
      {!showCelebration && (
        <button
          onClick={triggerCelebration}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white/90 dark:bg-card/90 backdrop-blur border border-border shadow-xl px-4 py-2.5 rounded-full hover:scale-105 active:scale-95 hover:shadow-2xl transition-all cursor-pointer text-xs font-semibold text-primary pointer-events-auto"
          title="Click to celebrate! 🎈"
        >
          <span className="animate-bounce">🎈</span>
          <span>Celebrate</span>
        </button>
      )}

      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Main celebration container */}
          <div className="relative w-full h-full">
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4 animate-bounce">
                  Happy 2-Week Anniversary
                </h2>
                <p className="text-xl text-foreground font-heading">Ray & Teena</p>
              </div>
            </div>

            {/* Balloons */}
            {[...Array(30)].map((_, i) => (
              <Balloon key={i} index={i} />
            ))}
          </div>

          {/* Dismiss overlay */}
          <button
            onClick={() => setShowCelebration(false)}
            className="fixed inset-0 cursor-default pointer-events-auto"
            aria-label="Close celebration"
          />
        </div>
      )}
    </>
  )
}

interface BalloonProps {
  index: number
}

function Balloon({ index }: BalloonProps) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 0.5
  const randomDuration = 3 + Math.random() * 2
  const randomSize = 30 + Math.random() * 40
  const balloonColors = ['#d4745f', '#e8a898', '#c1a88d', '#e5d5c8', '#d4745f', '#e8a898']
  const color = balloonColors[index % balloonColors.length]

  return (
    <div
      className="absolute animate-pulse"
      style={{
        left: `${randomX}%`,
        bottom: '-100px',
        animation: `float-balloon ${randomDuration}s ease-in infinite`,
        animationDelay: `${randomDelay}s`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
      }}
    >
      {/* Balloon */}
      <div
        className="w-full h-full rounded-full shadow-lg"
        style={{
          backgroundColor: color,
          opacity: 0.9,
        }}
      />
      {/* String */}
      <div
        className="absolute w-0.5 bg-current"
        style={{
          left: '50%',
          top: '100%',
          height: '40px',
          opacity: 0.6,
        }}
      />
    </div>
  )
}
