import React, { useState } from 'react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    carSearch: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hero form submitted:', formData);
  };

  return (
    <div className="hero-section">
      <div className="hero-single" style={{ background: 'url(assets/img/slider/hero-1.jpg)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9 col-lg-7">
              <div className="hero-content">
                <h6 className="hero-sub-title wow animate__animated animate__fadeInUp"
                    data-wow-duration="1s" data-wow-delay=".25s">50% Off Reserved Now!</h6>
                <h1 className="hero-title wow animate__animated animate__fadeInUp" data-wow-duration="1s"
                    data-wow-delay=".50s">
                    Quality Car Rent Service In Your City
                </h1>
                <p className="wow animate__animated animate__fadeInUp" data-wow-duration="1s"
                    data-wow-delay=".75s">
                    There are many variations of passages orem psum available but the majority have
                    suffered alteration in some form by injected humour or randomised words which
                    don't look even making it look like readable slightly believable.
                </p>
                <div className="hero-btn wow animate__animated animate__fadeInUp" data-wow-duration="1s"
                    data-wow-delay="1s">
                    <a href="#" className="theme-btn">About More<i className="far fa-arrow-right"></i></a>
                    <a href="#" className="theme-btn theme-btn2">Learn More<i
                            className="far fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              <div className="find-car mt-0">
                <div className="container">
                  <div className="find-car-form">
                    <div className="find-car-title-wrapper">
                      <h4 className="find-car-title">Let's Find Your Perfect Car</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-2">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Your Perfect Car</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Type Car, Model, Brand"
                              name="carSearch"
                              value={formData.carSearch}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-car"></i>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Pick Up Location</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Type City, Airport, Station"
                              name="pickupLocation"
                              value={formData.pickupLocation}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-location-dot"></i>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Drop Off Location</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Type City, Airport, Station"
                              name="dropoffLocation"
                              value={formData.dropoffLocation}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-location-dot"></i>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Pick Up Date</label>
                            <input 
                              type="date" 
                              className="form-control date-picker" 
                              placeholder="MM/DD/YY"
                              name="pickupDate"
                              value={formData.pickupDate}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-calendar-days"></i>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Pick Up Time</label>
                            <input 
                              type="time" 
                              className="form-control time-picker" 
                              placeholder="00:00 AM"
                              name="pickupTime"
                              value={formData.pickupTime}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-clock"></i>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Drop Off Date</label>
                            <input 
                              type="date" 
                              className="form-control date-picker" 
                              placeholder="MM/DD/YY"
                              name="dropoffDate"
                              value={formData.dropoffDate}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-calendar-days"></i>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Drop Off Time</label>
                            <input 
                              type="time" 
                              className="form-control time-picker" 
                              placeholder="00:00 AM"
                              name="dropoffTime"
                              value={formData.dropoffTime}
                              onChange={handleInputChange}
                            />
                            <i className="far fa-clock"></i>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-3 align-self-end">
                          <button className="theme-btn" type="submit">Find Your Car <i className="far fa-arrow-right"></i></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;