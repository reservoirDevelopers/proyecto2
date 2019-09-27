require('dotenv').config();
const axios = require("axios");

class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getBySearch(query) {
    const URL = `https://api.themoviedb.org/3/search/movie?query=`+query+`&api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL);
  }

  getActor(query) {
    const URL = `https://api.themoviedb.org/3/search/person?query=`+query+`&api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL);
  }

  getById(id) {
    const URL = `${this.BASE_URL}`+id+`?api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL);
  }

  getPopular() {
    const URL = `${this.BASE_URL}popular?api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL)  
  }

  getTopRated() {
    const URL = `${this.BASE_URL}top_rated?api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL)
  }

  getActingMovies(id) {
    const URL = `https://api.themoviedb.org/3/person/`+id+`/movie_credits?api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL)
  }

  getCast(id) {
    const URL = `https://api.themoviedb.org/3/movie/`+id+`/credits?api_key=${process.env.MOVIE_KEY}`
    return axios.get(URL)
  }
}

module.exports = APIHandler;

