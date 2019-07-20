import axios from "axios";

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
  getMessages: function() {
    return axios.get("/api/messages");
  },
  // Saves a message to the database
  saveMessage: function(messageData) {
    return axios.post("/api/messages", messageData);
  }
}