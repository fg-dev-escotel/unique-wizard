import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroSection from './components/HeroSection';
import Loading from '../../components/feedback/Loading';
import { startGetFeaturedCars, startSearchCars } from '../../redux/features/home/thunks';
import { setSearchQuery, setSortBy } from '../../redux/features/home/homeSlice';
import { formatoMoneda } from '../../utils/formatCurrency';
import CarArea from './components/CarArea';

const Home = () => {
  const dispatch = useDispatch();
  const {
    featuredCars,
    loading,
    error,
    searchQuery,
    sortBy,
    pagination
  } = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(startGetFeaturedCars(1, 6, sortBy, 'main'));
  }, [dispatch, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(startSearchCars(searchQuery, 1, 6, sortBy, 'main'));
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, 1, 6, newSortBy, 'main'));
    } else {
      dispatch(startGetFeaturedCars(1, 6, newSortBy, 'main'));
    }
  };

  const handleLoadMore = () => {
    const nextPage = pagination.currentPage + 1;
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, nextPage, 6, sortBy, 'main'));
    } else {
      dispatch(startGetFeaturedCars(nextPage, 6, sortBy, 'main'));
    }
  };

  return (
    <>
      <HeroSection />
      <main className="main">
        {/* breadcrumb eliminado, solo filtros y autos */}
        <div className="car-area bg py-120">
          <div className="container">
            <div className="col-md-12 mb-4">
              <div className="car-sort">
                <div className="car-widget p-0 m-0">
                  <div className="car-search-form">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} />
                        <button type="submit"><i className="far fa-search"></i></button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="car-sort-box">
                  <select className="form-select" value={sortBy} onChange={handleSortChange}>
                    <option value="1">Sort By Default</option>
                    <option value="5">Sort By Featured</option>
                    <option value="2">Sort By Latest</option>
                    <option value="3">Sort By Low Price</option>
                    <option value="4">Sort By High Price</option>
                  </select>
                </div>
              </div>
            </div>
            <CarArea scope="main" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;