require('dotenv').config();
const axios = require("axios")

class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getMovieDetails (id) {
    const URL = `${this.BASE_URL}`+id+`?api_key=${process.env.MOVIE_KEY}`
    console.log(URL)
    return axios.get(URL);
  }

  getPopular () {
    return axios.get(`${this.BASE_URL}/${id}`)
    https://api.themoviedb.org/3/movie/popular?api_key=635c64864baeba5e93b372e67e9905a3&language=en-US&page=1
  }

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