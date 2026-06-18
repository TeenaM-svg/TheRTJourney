import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import BalloonCelebration from '@/components/BalloonCelebration'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <BalloonCelebration />
      <Header />
      <Hero />
      <Timeline />
      <Testimonials />
      <Footer />
    </main>
  )
}
