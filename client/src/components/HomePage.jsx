import React from 'react';
import About from './About';
import Services from './Services';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import ScrollTopButton from './ScrollTopButton';
import '../Main.css';
import Hero from "./Hero";

function HomePage() {
    return (
        <div>
            <Hero />
            <main>
                <About data-aos="fade-up" />
                <Services data-aos="fade-up" />
                <Gallery />         {/* Instagram food gallery, with lightbox */}
                <Testimonials />    {/* Customer reviews, Bootstrap carousel */}
                {/*<OpeningHours data-aos="fade-up" />*/}
                <Contact data-aos="fade-up" />
            </main>
            <Footer />
            <ScrollTopButton />
        </div>
    );
}

export default HomePage;
