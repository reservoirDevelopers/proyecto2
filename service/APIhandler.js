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



  // getById(id) {
  //   const URL = `${this.BASE_URL}popular?api_key=${process.env.MOVIE_KEY}`
  //   https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //   console.log(URL)
  //   return axios.get(URL)
  // }

  // createOneRegister (character) {
  //   console.log(character)
  //   return axios.post(`${this.BASE_URL}`, character)
  // }

  // updateOneRegister (id, character) {
  //   return axios.put(`${this.BASE_URL}/${id}`, character)
  // }

  // deleteOneRegister (id) {
  //   return axios.delete(`${this.BASE_URL}/${id}`)
  // }
}

module.exports = APIHandler;

