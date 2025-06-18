import React from 'react'

function Services() {
  return (
    <section id="services" className="section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <div className="section-pill text-success mb-2">Wat Bieden We</div>
          <h2 className="section-title">Diensten</h2>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Service 1 */}
          <div className="col">
            <div className="services-card h-100 p-4 shadow-sm rounded bg-white">
              <h5>Afhalen of Bezorgen</h5>
              <p>
                Geen tijd om te blijven eten? Bestel eenvoudig online en kies
                voor snelle bezorging of kom het zelf afhalen. Altijd warm, vers
                en op tijd.
              </p>
              <a href="#contact-section" className="text-success fw-semibold">
                Meer Vragen &rarr;
              </a>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col">
            <div className="services-card h-100 p-4 shadow-sm rounded bg-white">
              <h5>Catering & Evenementen</h5>
              <p>
                Organiseert u een feest, bruiloft of bedrijfsbijeenkomst? Wij
                verzorgen heerlijke fatayers, wraps en schalen op maat. Vers
                bereid en direct geleverd op locatie.
              </p>
              <a href="#contact-section" className="text-success fw-semibold">
                Meer Vragen &rarr;
              </a>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col">
            <div className="services-card h-100 p-4 shadow-sm rounded bg-white">
              <h5>Speciale Bestellingen</h5>
              <p>
                Van vegetarische opties tot halal en glutenvrije verzoeken – bij
                Fatayer Time houden we rekening met ieders voorkeur. Vraag
                gerust naar onze aangepaste menu’s.
              </p>
              <a href="#contact-section" className="text-success fw-semibold">
                Meer Vragen &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
