import React from 'react';
import '../Main.css';

function MapSection() {
    return (
        <section className="map-section">
            <iframe
                title="Fatayer Time on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.568143638472!2d4.306881415879557!3d52.073284279732655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b727b93f6d73%3A0xa969ba66bb422b88!2sZuidwal%2094%2C%202512%20XP%20Den%20Haag!5e0!3m2!1sen!2snl!4v1692109557487!5m2!1sen!2snl"
                className="map"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );
}

export default React.memo(MapSection);
