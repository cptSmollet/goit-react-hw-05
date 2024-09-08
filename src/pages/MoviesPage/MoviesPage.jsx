import { useState } from 'react';
import { searchMovies } from '../../services/movies-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = (query) => {
    searchMovies(query).then(setMovies);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
