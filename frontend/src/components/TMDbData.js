// TMDbData.js
import React, { useEffect, useState } from 'react';

const TMDbData = () => {
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=4266f9a2ddf935f95e627d9a87840375');
      const data = await response.json();
      setTmdbMovies(data.results);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Películas Populares de TMDb</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="film-grid">
          {tmdbMovies.map(movie => (
            <div className="film-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="film-image"
              />
              <h3>{movie.title}</h3>
       
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TMDbData;
