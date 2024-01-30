const express = require("express");
const http = require("http");
const initializeSocketServer = require('./socket-server'); //Imports socket server setup
const cors = require('cors');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
// Creating HTTP server from Express app
const httpServer = http.createServer(app); // Create HTTP server

// Attach Socket.IO to HTTP server
const io = initializeSocketServer(httpServer);

httpServer.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});