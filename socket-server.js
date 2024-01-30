const {Server} = require('socket.io');
const {handleConnection, handleJoinRoom, handleMessage, handleLeave, handleDisconnect, handleRoomRequest} = require('./socket-handlers/socket')

const initializeSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });
    const roomData = {};
    const socketRoomMap = {};

    io.on('connection', (socket) => {
        handleConnection(io, socket, roomData)

        socket.on('join', (room) => {
            handleJoinRoom(io, socket, room, roomData)
            socketRoomMap[socket.id] = room;
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

        socket.on('disconnect', (room) => {
            handleDisconnect(io, socket, roomData, socketRoomMap)
        })

        socket.on('requestRooms', () => {
            handleRoomRequest(io, socket, roomData)
        })
    })

    return io;
}

module.exports = initializeSocketServer;