export default class API {
  static updateMovie(mov_id, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static createMovie(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static deleteMovie(mov_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }
  static loginUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static registerUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static getMovies(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((resp) => resp.json());
  }
}
