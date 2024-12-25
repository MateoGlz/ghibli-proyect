import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function GhibliFilm() {
  const location = useLocation();
  const params = useParams(); // Obtener el ID de la película desde la URL
  const [film, setFilm] = useState(location.state?.film || null); // Cargar datos del estado o null
  console.log('----- film -----')
  console.log(film);

  useEffect(() => {
    // Si no hay datos en el estado, busca la película usando el ID
    if (!film) {
      fetch(`https://ghibli.rest/films?id=${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setFilm(data[0]); // Accede al primer elemento del array
          }
        })
        .catch((error) => console.error('Error al cargar los datos:', error));
    }
  }, [film, params.id]);

  if (!film) {
    return <h1>Cargando película...</h1>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">{film.title}</h1> 
      <div className="row align-items-start">
        <div className="col-md-12 text-center">
          <img 
            src={film.movie_banner} 
            alt={film.title} 
            className="img-fluid rounded mb-3"
          />
          <p ><em>{film.original_title}</em></p> 
        </div>
        
      </div>
    </div>

  
  );
}

export default GhibliFilm;
