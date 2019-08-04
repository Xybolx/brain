import axios from "axios";
const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&y=&plot=short&apikey=trilogy";

export default {
  // gets all users who are online
  getUsers: function() {
    return axios.get("/api/users");
  },
  // gets a specific user
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
    // Saves a user to the database
  signUp: function(userData) {
    return axios.post("/api/signup", userData);
  },
  // Logs a user in
  logIn: function(loginData) {
    return axios.post("/api/login", loginData);
  },
  // Logs a user out
  logOut: function(id) {
    return axios.get("/api/logout", id);
  },
  // Gets all messages from the database
  getMessages: function(id) {
    return axios.get("/api/messages", id);
  },
  // Saves a message to the database
  saveMessage: function(messageData) {
    return axios.post("/api/messages", messageData);
  },
  // Searches OMdb for a movie
  searchMovie: function(searchData) {
    return axios.get(BASEURL + searchData + APIKEY);
  },
  // Saves a movie to the database
  saveMovie: function(movieData) {
    return axios.post("/api/movies", movieData);
  },
  // Gets current movies from database
  getMovies: function() {
    return axios.get("/api/movies");
  },
  // Gets a specific movie from the database
  getMovie: function(id) {
    return axios.get("/api/movies/" + id);
  }
}