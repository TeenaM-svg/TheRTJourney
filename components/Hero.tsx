'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                Our Love <span className="text-gradient">Story</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Two hearts, one beautiful journey. From June 4th to forever.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-white border border-border rounded-lg p-5 glow-hover">
                <p className="text-sm font-semibold text-foreground mb-1">
                  East Legon, Accra → Kumasi
                </p>
                <p className="text-xs text-muted-foreground">
                  Distance measured in miles. Feelings measured in love.
                </p>
              </div>

              <div 
                onClick={() => window.dispatchEvent(new CustomEvent('trigger-balloon-celebration'))}
                className="bg-white border border-border rounded-lg p-5 glow-hover cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                title="Click for celebration! 🎈"
              >
                <p className="text-2xl font-heading font-bold text-gradient mb-1">2 Weeks</p>
                <p className="text-xs text-muted-foreground">
                  And counting with ❤️ (Click me!)
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-80 md:h-full min-h-80">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg glow-hover">
              <Image
                src="/couple-journey.jpeg"
                alt="Ray and Teena"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-3 -left-3 w-full h-full border-2 border-primary rounded-xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
