const express = require("express");
const passport = require("./config/passport-setup");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express(); 
const http = require("http").Server(app);
const io = require("socket.io")(http);
const socketEvents = require("./socketEvents");
const PORT = process.env.PORT || 3001;

// attach sockets http listener
io.attach(http);

// attach socketEvents to socket
socketEvents(io);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// static directory
app.use(express.static("client/src/imgs"));

// session stuff
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/brain", { useNewUrlParser: true });

// Add routes, both API and user
app.use(routes);

// Start the API server
http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
