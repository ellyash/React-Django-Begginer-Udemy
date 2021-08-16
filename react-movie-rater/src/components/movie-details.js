import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function MovieDetails(props) {
  let mov = props.movie;

  const [highlighted, setHighlighted] = useState(-1);
  const [token] = useCookies(["login-token"]);

  const highlightRate = (high) => (evt) => {
    setHighlighted(high);
  };
  const rateClicked = (rate) => (evt) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov.id}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["login-token"]}`,
      },
      body: JSON.stringify({ stars: rate + 1 }),
    })
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };
  const getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["login-token"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateMovie(resp))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {mov ? (
        <div className="movie-details">
          <h1>{mov && mov.title}</h1>
          <p>{mov && mov.description}</p>
          <h3>Community Rating</h3>
          <div className="rate-container">
            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? "gold" : ""} />
            <span className="avg-rating"> {mov.avg_rating}/5 </span>
            <span className="no-of-ratings">({mov.no_of_ratings})</span>
          </div>
          <div className="rate-container">
            <h3>Your rating</h3>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={highlighted > i - 1 ? "orange" : ""}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={rateClicked(i)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default MovieDetails;
