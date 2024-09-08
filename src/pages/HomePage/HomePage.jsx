
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/movies-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error('Failed to fetch trending movies', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={css.homePage}>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;

