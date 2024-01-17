const express = require("express");
const http = require("http");
const { Server } = require('socket.io'); // Import Server class from socket.io
const setupSocket = require('./controllers/socket'); // imports socket.io setup

const rooms = {}; // stores chat rooms

// const allRoutes = require('./controllers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// app.use('/', allRoutes);

// Creating HTTP server from Express app
const httpServer = http.createServer(app); // Create HTTP server


// Attach Socket.IO to HTTP server
const io = new Server(httpServer);

// Init Socket.IO logic
// Pass the io instance to the setup function
setupSocket(io);

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});