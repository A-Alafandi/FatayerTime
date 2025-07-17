import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';

import img1 from '../assets/img/testimonials/testimonials-1.jpg';
import img2 from '../assets/img/testimonials/testimonials-2.jpg';
import img3 from '../assets/img/testimonials/testimonials-3.jpg';
import img4 from '../assets/img/testimonials/testimonials-4.jpg';

const testimonials = [
    {
        name: 'Saul Goodman',
        role: 'Ceo & Founder',
        text:
            'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.',
        image: img1,
        stars: 5,
    },
    {
        name: 'Sara Wilsson',
        role: 'Designer',
        text:
            'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.',
        image: img2,
        stars: 5,
    },
    {
        name: 'Jena Karlis',
        role: 'Store Owner',
        text:
            'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.',
        image: img3,
        stars: 5,
    },
    {
        name: 'John Larson',
        role: 'Entrepreneur',
        text:
            'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.',
        image: img4,
        stars: 5,
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonials section light-background py-5">
            <div className="container section-title" data-aos="fade-up">
                <h2>TESTIMONIALS</h2>
                <p>
                    What Are They <span className="description-title">Saying About Us</span>
                </p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    className="testimonials-carousel init-swiper"
                    style={{ paddingBottom: 50 }}
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx} className="swiper-slide" style={{ maxWidth: 950 }}>
                            <div className="testimonial-item bg-white rounded-4 shadow-sm px-4 py-5 mx-auto h-100">
                                <div className="row align-items-center gy-4 justify-content-center">
                                    {/* Left: Content */}
                                    <div className="col-lg-8">
                                        <div className="testimonial-content">
                                            <p className="mb-3 fs-5 fw-light" style={{ color: '#222', minHeight: 100 }}>
                                                <i className="bi bi-quote quote-icon-left"></i>
                                                <span>{t.text}</span>
                                                <i className="bi bi-quote quote-icon-right"></i>
                                            </p>
                                            <h3>{t.name}</h3>
                                            <h4>{t.role}</h4>
                                            <div className="stars mb-2">
                                                {[...Array(t.stars)].map((_, i) => (
                                                    <i key={i} className="bi bi-star-fill"></i>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right: Image */}
                                    <div className="col-lg-4 text-center">
                                        <img
                                            src={t.image}
                                            className="testimonial-img"
                                            alt={t.name}
                                            style={{
                                                width: 130,
                                                height: 130,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                border: '4px solid #fff',
                                                boxShadow: '0 2px 8px rgba(206,18,18,0.16)',
                                                background: '#fff'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination" />
                </Swiper>
            </div>
        </section>
    );
}
