const socketIO = require('socket.io');
const {handleConnection, handleJoinRoom, handleMessage} = require('./socket-handlers/socket')

const initializeSocketServer = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        handleConnection(io, socket)

        socket.on('join', (room) => {
            handleJoinRoom(io, socket, room)
        })
    
        socket.on('message', (room, message) => {
            handleMessage(io, socket, room, message)
        })

        socket.on('draw', (room, change) => {
            handleDraw(io, socket, room, change)
        })
    })

    return io;
}

module.exports = initializeSocketServer;