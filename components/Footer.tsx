'use client'

export default function Footer() {
  const today = new Date()
  const startDate = new Date('2026-06-04')
  const daysActive = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div className="space-y-2">
            <div className="text-lg font-heading font-bold text-gradient">RTJourney</div>
            <p className="text-xs text-muted-foreground">
              A celebration of love, connection, and new beginnings.
            </p>
            <div className="text-xl">❤️</div>
          </div>

          {/* Timeline Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-heading font-semibold text-foreground">Our Timeline</h3>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>Met: June 4, 2026</li>
              <li>Distance: 193 km / 120 miles</li>
              <li>Status: Growing stronger daily</li>
              <li>Days together: {daysActive} days</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <h3 className="text-sm font-heading font-semibold text-foreground">Locations</h3>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>Ray: East Legon, Accra</li>
              <li>Teena: Kumasi</li>
              <li>Distance: No barrier</li>
              <li>Hearts: Forever connected</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© 2026 RTJourney. Created with love by Ray & Teena.</p>
          <p className="text-center md:text-right mt-3 md:mt-0">
            Made with ❤️ • Celebrating 2 weeks of beautiful moments
          </p>
        </div>
      </div>
    </footer>
  )
}
