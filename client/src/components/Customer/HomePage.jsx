import HeaderHero from '../HeaderHero';
import About from '../About';
import Services from '../Services';
import GoogleReview from '../GoogleReview';
import MapSection from '../MapSection';
import OpeningHours from '../OpeningHours';
import Contact from '../Contact';
import Footer from '../Footer';

export default function HomePage() {
    return (
        <>
            <HeaderHero showHero showButtons />
            <About />
            <Services />
            <section className="container py-5">
                <GoogleReview />
            </section>
            <MapSection />
            <OpeningHours />
            <Contact />
            <Footer />
        </>
    );
}