// FilmDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FilmDetail() {
  const { id } = useParams();  // Obtener el id de la película desde la URL
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetch(`https://ghibli.rest/films?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setFilm(data[0]);  // Suponiendo que la respuesta es un array con un solo objeto
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(`Reseña: ${review}, Calificación: ${rating}`);
    // Aquí podrías enviar la reseña y calificación a una API o guardarla en algún estado
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {film && (
        <>
          <h1>{film.title}</h1>
          <img src={film.image} alt={film.title} />
          <p>{film.description}</p>

          <h2>Agregar una reseña</h2>
          <form onSubmit={handleReviewSubmit}>
            <label>
              Reseña:
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
            <label>
              Calificación:
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
              />
            </label>
            <button type="submit">Enviar</button>
          </form>
        </>
      )}
    </div>
  );
}

export default FilmDetail;
