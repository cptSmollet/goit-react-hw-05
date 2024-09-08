import styles from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
