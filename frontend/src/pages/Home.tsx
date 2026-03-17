import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Showcase from '../components/Showcase'
import EventStructure from '../components/EventStructure'
import KeyHighlights from '../components/KeyHighlights'
import CallToAction from '../components/CallToAction'
import FestBanner from '../components/FestBanner'
import About from '../components/About'
import RegistrationCards from '../components/RegistrationCards'
import GallerySlider from '../components/GallerySlider'
import CommunityPartners from '../components/CommunityPartners'

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-secondary font-sans text-gray-900 overflow-x-hidden">
            <Header />
            <main className="grow flex flex-col w-full">
                <Hero />
                <Showcase />
                <EventStructure />
                <KeyHighlights />
                <CallToAction />
                <FestBanner />
                <About />
                <RegistrationCards />
                <GallerySlider />
                <CommunityPartners />
            </main>
            <Footer />
        </div>
    )
} 
