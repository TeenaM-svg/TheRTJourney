'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border overflow-hidden group">
      <div className="relative h-32 w-full">
        {/* Background image spanning full width */}
        <Image
          src="/anniversary.png"
          alt="Ray & Teena Anniversary"
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-75"
          priority
        />
        
        {/* Dark overlay for text readability - clear by default, dims on hover */}
        <div className="absolute inset-0 bg-black/0 backdrop-blur-none transition-all duration-300 group-hover:bg-black/40 group-hover:backdrop-blur-[2px]"></div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-heading font-bold text-white">RTJourney</h1>
              <p className="text-xs text-white/80">2 Weeks Together</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#journey" className="text-xs font-medium text-white hover:text-primary transition-colors">
              Journey
            </a>
            <a href="#moments" className="text-xs font-medium text-white hover:text-primary transition-colors">
              Moments
            </a>
            <a href="#about" className="text-xs font-medium text-white hover:text-primary transition-colors">
              About Us
            </a>
          </nav>
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('trigger-balloon-celebration'))}
            className="text-xl heart-pulse cursor-pointer hover:scale-125 transition-transform"
            title="Click for celebration! 🎈"
          >
            ❤️
          </div>
        </div>
      </div>
    </header>
  )
}
