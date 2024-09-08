import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError('Failed to fetch trending movies.');
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.homePage}>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
