import "./App.css";
import React, { useState, useEffect } from "react";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, removeToken] = useCookies(["login-token"]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!token["login-token"]) window.location.href = "/";
  }, [token]);

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };
  const editClicked = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const updatedMovie = (movie) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === movie.id) {
        setEditedMovie(null);
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
  };

  const newMovie = () => {
    setEditedMovie({ title: "", description: "" });
    setSelectedMovie(null);
  };

  const updateNewMovie = (movie) => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const removeClicked = (movie) => {
    const newMovies = movies.filter((mov) => mov.id !== movie.id);
    setMovies(newMovies);
  };

  const logoutUser = () => {
    removeToken(["login-token"]);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error</h2>;
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />{" "}
          <span>
            M<FontAwesomeIcon icon={faStar} />
            vie Rater
          </span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button onClick={newMovie}>Add Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
            updateNewMovie={updateNewMovie}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
