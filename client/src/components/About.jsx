import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import fatayerImg from '../assets/img/fatayer.png';
function About() {
  return (
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
          <p>
            <span>Learn More</span> <span className="description-title">About Fatayer Time</span>
          </p>
        </div>
        <div className="container">
          <div className="row gy-4">
            {/* About Image */}
            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
              <img
                  src={fatayerImg}
                  className="img-fluid mb-4 rounded-3 shadow"
                  alt="Fatayer Time bakery"
              />
              {/* You can add a secondary image or leave this blank */}
              {/* <div className="position-relative mt-4">
              <img src="/assets/img/about-2.jpg" className="img-fluid" alt="" />
            </div> */}
            </div>
            {/* About Text */}
            <div className="col-lg-5 d-flex align-items-center" data-aos="fade-up" data-aos-delay="250">
              <div className="content ps-0 ps-lg-5">
                <p className="fst-italic">
                  Fatayer Time is a family-run bakery specializing in authentic Middle Eastern pies—handmade with love and fresh ingredients every day in The Hague.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> <span>100% Handmade with fresh ingredients</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> <span>Traditional flavors with a modern twist</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> <span>50+ Happy customers and growing every week</span>
                  </li>
                </ul>
                <p>
                  Our signature fatayers are baked to perfection, blending authentic Middle Eastern taste with quality you can trust.
                </p>
                {/* Stats row */}
                <div className="row mt-4 text-center">
                  <div className="col">
                    <h4 className="display-6 fw-bold text-danger">100%</h4>
                    <p className="text-muted mb-0">Handmade</p>
                  </div>
                  <div className="col">
                    <h4 className="display-6 fw-bold text-danger">50+</h4>
                    <p className="text-muted mb-0">Happy Customers</p>
                  </div>
                  <div className="col">
                    <h4 className="display-6 fw-bold text-danger">10+</h4>
                    <p className="text-muted mb-0">Varieties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default React.memo(About);
