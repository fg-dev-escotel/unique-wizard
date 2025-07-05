import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetSubastaTorres } from '../../../redux/features/auction/thunks';

const HeroSlider = () => {
  const dispatch = useDispatch();
  const { subastaTorres, loading } = useSelector((state) => state.subastaReducer);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cargar datos de subastas
  useEffect(() => {
    if (!subastaTorres?.torres?.length) {
      dispatch(startGetSubastaTorres('1-250616'));
    }
  }, [dispatch, subastaTorres]);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3); // 3 slides
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      subtitle: '50% Off Reserved Now!',
      title: 'Car Rental In Your <span>Desired</span> Destination',
      description: 'There are many variations of passages orem psum available but the majority have suffered alteration in some form by injected humour or randomised words which don\'t look even making it look like readable slightly believable.'
    },
    {
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      subtitle: '50% Off Reserved Now!',
      title: 'Car Rental In Your <span>Desired</span> Destination',
      description: 'There are many variations of passages orem psum available but the majority have suffered alteration in some form by injected humour or randomised words which don\'t look even making it look like readable slightly believable.'
    },
    {
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      subtitle: '50% Off Reserved Now!',
      title: 'Car Rental In Your <span>Desired</span> Destination',
      description: 'There are many variations of passages orem psum available but the majority have suffered alteration in some form by injected humour or randomised words which don\'t look even making it look like readable slightly believable.'
    }
  ];

  return (
    <div className="hero-section">
      <div className="hero-slider owl-carousel owl-theme">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="hero-single" 
            style={{ 
              background: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: index === currentSlide ? 'block' : 'none'
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-9 col-lg-7">
                  <div className="hero-content">
                    <h6 
                      className="hero-sub-title wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" 
                      data-wow-delay=".25s"
                    >
                      {slide.subtitle}
                    </h6>
                    <h1 
                      className="hero-title wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" 
                      data-wow-delay=".50s"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    <p 
                      className="wow animate__animated animate__fadeInUp" 
                      data-wow-duration="1s"
                      data-wow-delay=".75s"
                    >
                      {slide.description}
                    </p>
                    <div 
                      className="hero-btn wow animate__animated animate__fadeInUp" 
                      data-wow-duration="1s"
                      data-wow-delay="1s"
                    >
                      <Link to="/about" className="theme-btn">
                        About More<i className="far fa-arrow-right"></i>
                      </Link>
                      <Link to="/cars" className="theme-btn theme-btn2">
                        Learn More<i className="far fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;