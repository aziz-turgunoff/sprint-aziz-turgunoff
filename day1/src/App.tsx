import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import WaitlistForm from './components/WaitlistForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
