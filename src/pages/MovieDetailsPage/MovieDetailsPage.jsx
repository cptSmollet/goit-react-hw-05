import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, NavLink, Outlet } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        const creditsData = await fetchMovieCredits(movieId);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.header}>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className={css.poster}
          />
        )}
        <div className={css.details}>
          <h1 className={css.title}>{title}</h1>
          <p className={css.description}>{overview}</p>
          <p className={css.genres}>
            Genres: {genres.map(genre => genre.name).join(', ')}
          </p>
          <p className={css.userScore}>User Score: {vote_average}</p>
        </div>
      </div>
      <nav className={css.navLinks}>
        <NavLink to="cast" className={css.navLink} style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={css.navLink} style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;




