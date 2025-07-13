import { contactInfo } from './contactInfo';

function Contact() {
  return (
      <section className="contact-section bg-light" id="contact-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Contact</h2>
            <p>
              Heeft u vragen? U kunt ons bereiken via WhatsApp, e-mail of
              telefoon.
              <br />
              Wij zorgen ervoor dat u binnen 24 uur een reactie ontvangt.
            </p>
          </div>
          <div className="row justify-content-center">
            {/* WhatsApp */}
            <div className="col-12 col-md-4 contact-card">
              <div className="contact-info">
                <i className="bi bi-whatsapp first-icon"></i>
                <h4>Whatsapp</h4>
                <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}`}
                    className="clickable-links"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Whatsapp &nearr;
                </a>
              </div>
            </div>

            {/* Telefoon */}
            <div className="col-12 col-md-4 contact-card">
              <div className="contact-info">
                <i className="bi bi-telephone first-icon"></i>
                <h4>Telefoon</h4>
                <a href={`tel:${contactInfo.phone}`} className="clickable-links">
                  {contactInfo.phone} &nearr;
                </a>
              </div>
            </div>

            {/* E-mail */}
            <div className="col-12 col-md-4 contact-card">
              <div className="contact-info">
                <i className="bi bi-envelope-at first-icon"></i>
                <h4>E-mail</h4>
                <a
                    href={`mailto:${contactInfo.email}`}
                    className="clickable-links"
                >
                  {contactInfo.email} &nearr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Contact;