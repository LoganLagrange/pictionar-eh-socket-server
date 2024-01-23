const handleConnection = (io, socket) => {
    console.log(`User connected: ${socket.id}`)
}

const handleJoinRoom = (io, socket, room) => {
    socket.join(room);
    socket.emit(`Welcome to ${room}`)
}

const handleMessage = (io, socket, room, message) => {
    console.log(`Received message from ${socket.id}: ${message} in room ${room}`)
    io.to(room).emit('broadcastMessage', {message})
}

const handleDraw = (io, socket, room, change) => {
    console.log(`Draw event from socket ${socket.id} in room: ${room}`)
    io.to(room).emit('drawChange', {change})
}

module.exports = {
    handleConnection,
    handleJoinRoom,
    handleMessage,
    handleDraw
}