import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services, { Laboratoire, Teleradiologie, Kinesitherapie } from '../components/Services'
import Mallette from '../components/Mallette'
import Ambulance from '../components/Ambulance'
import BodyChecker from '../components/BodyChecker'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import SOSButton from '../components/SOSButton'
import FloatingContacts from '../components/FloatingContacts'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BodyChecker />
      <Services />
      <Mallette />
      <Ambulance />
      <Laboratoire />
      <Teleradiologie />
      <Kinesitherapie />
      <Contact />
      <FAQ />
      <Footer />
      <SOSButton />
      <FloatingContacts />
    </main>
  )
}
