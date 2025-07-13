function MapSection() {
    return (
        <section className="map py-5 bg-white mb-5">
            <div className="container text-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.001922116734!2d4.3527295!3d52.0765011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b79df86d7ddf%3A0xe2e7ae262040b6b9!2sFatayer%20Time!5e0!3m2!1snl!2snl!4v1718107312000!5m2!1snl!2snl"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Fatayer Time Map"
                ></iframe>
            </div>
        </section>
    )
}
export default MapSection
