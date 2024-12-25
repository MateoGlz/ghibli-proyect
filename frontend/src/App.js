// App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Catalogo from './components/Catalogo';
import Layout from "./components/Layout";
import FilmDetail from './components/FilmDetail';
import FilmSelection from './components/FilmSelection';
import GhibliFilm from './components/GhibliFilm';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  // Fetch the list of films
  useEffect(() => {
    fetch('/api/films')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching films');
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/FilmSelection" />
              ) : (
                <div className="login-container">
                  <h2>Iniciar Sesión</h2>
                  <form onSubmit={handleLogin}>
                    <div>
                      <label>Usuario</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Contraseña</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Ingresar</button>
                  </form>
                </div>
              )
            }
          />

          <Route element={<Layout />}>
            <Route
              path="/FilmSelection"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FilmSelection films={films} loading={loading} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Catalogo"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Catalogo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/FilmDetail"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FilmDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/film/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <GhibliFilm />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>

        {/* Footer global */}
        <Footer />
      </div>
    </Router>

  );
}

export default App;
