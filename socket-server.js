const socketIO = require('socket.io');
const {handleConnection, handleJoinRoom, handleMessage, handleLeave} = require('./socket-handlers/socket')

const initializeSocketServer = (server) => {
    const io = socketIO(server);
    const roomData = {};

    io.on('connection', (socket) => {
        handleConnection(io, socket, roomData)

        socket.on('join', (room) => {
            handleJoinRoom(io, socket, room, roomData)
        })
    
        socket.on('message', (room, message) => {
            handleMessage(io, socket, room, message, roomData)
        })

        socket.on('draw', (room, change) => {
            handleDraw(io, socket, room, change)
        })

        socket.on('leave', (room) => {
            handleLeave(io, socket, room, roomData)
        })
    })

    return io;
}

module.exports = initializeSocketServer;