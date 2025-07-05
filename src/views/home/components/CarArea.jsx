import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetFeaturedCars } from '../../../redux/features/home/thunks';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

// Usa la imagen principal si está disponible
const getCarImage = (car) => {
  if (car.urlImgPrincipal) return car.urlImgPrincipal;
  return DEFAULT_IMAGE;
};

// Calcula el tiempo restante en formato legible y detallado
const getTimeLeft = (fechaFin) => {
  if (!fechaFin) return '';
  const end = new Date(fechaFin);
  const now = new Date();
  let diff = end - now;
  if (diff <= 0) return 'Subasta terminada';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  // Mostrar siempre los segundos con dos dígitos
  const pad = (n) => n.toString().padStart(2, '0');
  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
};

// Determina si el auto está activo o inactivo
const getStatus = (car) => {
  // Si la subasta terminó (fechaFin en el pasado), es inactivo (rojo)
  if (car.fechaFin) {
    const end = new Date(car.fechaFin);
    if (end <= new Date()) return 'Inactivo';
    return 'Activo';
  }
  // Si hay una propiedad específica, usarla
  if (car.activo !== undefined) return car.activo ? 'Activo' : 'Inactivo';
  return 'Inactivo';
};

const CarArea = ({ scope = 'main' }) => {
  const dispatch = useDispatch();
  const carsState = useSelector(state => state.homeReducer.carsByScope?.[scope] || {});
  const { featuredCars = [], loading, error } = carsState;
  // Estado para forzar actualización cada segundo
  const [, setTick] = useState(0);

  useEffect(() => {
    dispatch(startGetFeaturedCars(1, 6, '1', scope));
  }, [dispatch, scope]);

  // Actualiza cada segundo para que el tiempo restante cuente
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center py-5">Cargando autos...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="car-area bg py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Unique Motors</span>
              <h2 className="site-title">Autos <span>Destacados</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {featuredCars && featuredCars.length > 0 ? (
            featuredCars.map((car) => {
              const status = getStatus(car);
              const isActive = status === 'Activo';
              const subastaTerminada = getTimeLeft(car.fechaFin) === 'Subasta terminada';
              return (
                <div key={car.torreID || car.id} className="col-lg-6 col-xl-4">
                  <div className="car-item position-relative" style={{borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.07)'}}>
                    <div className="car-img position-relative" style={{borderRadius: 16, overflow: 'hidden'}}>
                      {/* Etiquetas solo si la subasta sigue activa */}
                      {!subastaTerminada ? (
                        <>
                          {/* Etiqueta de estado - esquina superior izquierda */}
                          <span className="badge bg-success" style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            zIndex: 2
                          }}>
                            <i className="far fa-clock me-1"></i>
                            Activa
                          </span>
                          {/* Etiqueta de tiempo - esquina superior derecha */}
                          <span className="badge bg-warning text-dark" style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 2
                          }}>
                            <i className="far fa-clock me-1"></i>
                            {getTimeLeft(car.fechaFin)}
                          </span>
                        </>
                      ) : (
                        // Solo mostrar subasta terminada en la esquina superior derecha
                        <span className="badge bg-danger text-white" style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          zIndex: 2
                        }}>
                          <i className="far fa-clock me-1"></i>
                          Subasta Terminada
                        </span>
                      )}
                      <img src={getCarImage(car)} alt={car.nombre || car.name || 'Car'} style={{ width: '100%', borderRadius: 16, height: 240, objectFit: 'cover' }} />
                    </div>
                    <div className="car-content p-4 pb-3">
                      <div className="d-flex align-items-center mb-2">
                        <h4 className="mb-0" style={{fontWeight: 700}}>{car.nombre || car.name || 'Vehículo'}</h4>
                        <span className="ms-auto" style={{color: '#ffb300', fontWeight: 600, fontSize: 18}}>
                          <i className="fas fa-star"></i> 5.0
                        </span>
                      </div>
                      <div className="d-flex flex-wrap mb-2" style={{gap: 18, color: '#6c63ff', fontWeight: 500, fontSize: 16}}>
                        <span><i className="far fa-car"></i> Modelo: {car.modelo || car.modeloAnio || 'N/A'}</span>
                        <span><i className="far fa-user"></i> {car.capacidad || '4'} Personas</span>
                        <span><i className="far fa-gas-pump"></i> {car.tipoCombustible || 'Gasolina'}</span>
                      </div>
                      <div className="d-flex flex-wrap mb-2" style={{gap: 18, color: '#6c63ff', fontWeight: 500, fontSize: 16}}>
                        <span><i className="far fa-road"></i> {car.rendimiento || '10.15km / 1-litro'}</span>
                        <span><i className="far fa-steering-wheel"></i> {car.transmision || 'Automático'}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3 pt-2" style={{borderTop: '1px solid #eee'}}>
                        <span style={{fontWeight: 700, color: '#3a3a3a', fontSize: 22}}>
                          {car.precio ? `$${Number(car.precio).toLocaleString('es-MX', {minimumFractionDigits:2})}` : '$900,000.00'} <span style={{fontWeight: 400, fontSize: 15, color: '#888'}}> / subasta</span>
                        </span>
                        <div>
                          <button className="btn btn-light" style={{borderRadius: 12, marginRight: 8, color: '#6c63ff', fontWeight: 700, border: 'none'}}><i className="far fa-heart"></i></button>
                          <a href="#" className="btn btn-primary" style={{borderRadius: 12, fontWeight: 700, background: '#6c63ff', border: 'none'}}>Ver Subasta</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">No se encontraron vehículos disponibles.</div>
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          <a href="#" className="theme-btn">Load More <i className="far fa-arrow-rotate-right"></i> </a>
        </div>
      </div>
    </div>
  );
};

export default CarArea;