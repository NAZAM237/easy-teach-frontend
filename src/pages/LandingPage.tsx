import Header from "../components/landing-page/Header.tsx";
import Features from "../components/landing-page/Features.tsx";
import Benefits from "../components/landing-page/Benefits.tsx";
import Pricing from "../components/landing-page/Pricing.tsx";
import CallToAction from "../components/landing-page/CallToAction.tsx";
import Footer from "../components/landing-page/Footer.tsx";
import Hero from "../components/landing-page/Hero.tsx";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <Hero />
            <Features />
            <Benefits />
            <Pricing />
            <CallToAction />
            <Footer />
        </div>
    );
};
