const handleConnection = (io, socket) => {
    console.log(`User connected: ${socket.id}`)
}

const handleJoinRoom = (io, socket, room, roomData) => {
    socket.join(room);
    socket.emit(`Welcome to ${room}`)
    if (!roomData[room]) {
        roomData[room] = {count: 1}
    } else {
        roomData[room].count += 1;
    }
    io.to(room).emit("updateRoomData", roomData[room])
}

const handleMessage = (io, socket, room, message, roomData) => {
    console.log(`Received message from ${socket.id}: ${message} in room ${room}`)
    io.to(room).emit('broadcastMessage', {message})
}

const handleDraw = (io, socket, room, change, roomData) => {
    console.log(`Draw event from socket ${socket.id} in room: ${room}`)
    io.to(room).emit('drawChange', {change})
}

const handleLeave = (io, socket, room, roomData) => {
    socket.leave(room);
    console.log(`Socket ${socket} left room ${room}`);
    if(roomData[room]) {
        roomData[room].count -= 1;

        if(roomData[room].count <= 0) {
            delete roomData[room];
        } else {
            io.to(room).emit('updateRoomData', roomData[room])
        }
    }

}

module.exports = {
    handleConnection,
    handleJoinRoom,
    handleMessage,
    handleDraw,
    handleLeave
}