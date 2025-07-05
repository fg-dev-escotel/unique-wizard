import React from 'react';

const TestimonialArea = () => {
  const testimonials = [
    {
      name: 'Carlos Rodríguez',
      position: 'Comprador satisfecho',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 5,
      text: 'Excelente experiencia comprando mi Toyota Camry. El proceso fue transparente y obtuve un precio increíble. Definitivamente recomiendo esta plataforma.'
    },
    {
      name: 'María González',
      position: 'Cliente frecuente',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 5,
      text: 'He comprado dos vehículos a través de esta plataforma. El servicio al cliente es excepcional y los vehículos llegan en perfectas condiciones.'
    },
    {
      name: 'José Martínez',
      position: 'Vendedor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 5,
      text: 'Como vendedor, me impresionó la facilidad del proceso y el precio que obtuve por mi vehículo. La plataforma es muy profesional y confiable.'
    }
  ];

  return (
    <div className="testimonial-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Testimonios</span>
              <h2 className="site-title">Lo que dicen nuestros <span>clientes</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="testimonial-item">
                <div className="testimonial-rate">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-author-img">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialArea;