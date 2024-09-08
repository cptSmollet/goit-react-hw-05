import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../../services/movies-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
    fetchMovieCredits(movieId).then(setCast);
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <MovieCast cast={cast} />
      <MovieReviews reviews={reviews} />
    </div>
  );
};

export default MovieDetailsPage;
