import React from 'react'
import Fatayer from '../assets/fatayer.png'
;<assets />

function About() {
  return (
    <section id="about" className="section py-5">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-4">
          {/* <div className="section-pill">Passie tot Professie</div> */}
          <h2 className="section-title">Over Ons</h2>
        </div>

        {/* Content */}
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-5 mb-4 mb-md-0">
            <img
              src={Fatayer}
              alt="Team brainstorming"
              className="img-fluid about-image"
            />
          </div>

          {/* Text */}
          <div className="col-md-6">
            <h3 className="about-subtitle">
              Fatayer Time in Den Haag biedt een heerlijke selectie van
              traditionele en moderne fatayers
            </h3>
            <p className="about-text">
              ambachtelijk bereid met diverse vullingen zoals speciaal gekruid
              gehakt, Syrische kaas, en muhamarasaus.
            </p>
            <p className="about-text">
              Onze populaire opties omvatten Fatayer toshka, kip curry met kaas,
              en pastrami kaas
            </p>
            <p className="about-text">
              ideaal voor een smaakvolle lunch of een snelle hap. Kom langs en
              ervaar het zelf bij Fatayer Time!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
