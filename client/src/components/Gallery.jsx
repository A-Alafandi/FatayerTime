import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import img1 from '../assets/img/gallery/gallery-1.jpg';
import img2 from '../assets/img/gallery/gallery-2.jpg';
import img3 from '../assets/img/gallery/gallery-3.jpg';
import img4 from '../assets/img/gallery/gallery-4.jpg';
import img5 from '../assets/img/gallery/gallery-5.jpg';
import img6 from '../assets/img/gallery/gallery-6.jpg';
import img7 from '../assets/img/gallery/gallery-7.jpg';
import img8 from '../assets/img/gallery/gallery-8.jpg';

const galleryImages = [
    img1, img2, img3, img4, img5, img6, img7, img8
];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <section id="gallery" className="gallery section light-background py-5">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Gallery</h2>
                <p>
                    <span>Check</span> <span className="description-title">Our Gallery</span>
                </p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    className="init-swiper"
                    style={{ paddingBottom: 40 }}
                >
                    {galleryImages.map((img, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="d-flex align-items-center swiper-slide"
                            style={{
                                maxWidth: 300,
                                cursor: "pointer",
                                justifyContent: "center"
                            }}
                        >
                            <a
                                href="#!"
                                onClick={e => {
                                    e.preventDefault();
                                    setPhotoIndex(idx);
                                    setIsOpen(true);
                                }}
                                className="glightbox"
                                data-gallery="images-gallery"
                            >
                                <img
                                    src={img}
                                    className="img-fluid rounded-4 shadow-sm"
                                    style={{ maxHeight: 180, objectFit: 'cover' }}
                                    alt=""
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination" />
                </Swiper>
                {/* Lightbox for image viewing */}
                {isOpen && (
                    <Lightbox
                        mainSrc={galleryImages[photoIndex]}
                        nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length]}
                        prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() => setPhotoIndex((photoIndex + galleryImages.length - 1) % galleryImages.length)}
                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % galleryImages.length)}
                        imageCaption={`Photo ${photoIndex + 1} of ${galleryImages.length}`}
                    />
                )}
            </div>
        </section>
    );
}
