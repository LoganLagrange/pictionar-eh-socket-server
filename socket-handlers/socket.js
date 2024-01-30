const handleConnection = (io, socket) => {
    console.log(`User connected: ${socket.id}`)
}

const handleJoinRoom = (io, socket, room, roomData) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`)
    socket.emit(`Welcome to ${room}`)
    if (!roomData[room]) {
        roomData[room] = {count: 1}
    } else {
        roomData[room].count += 1;
    }
    io.to(room).emit("updateRoomData", roomData[room])
    console.log(roomData);
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
    console.log(`Socket ${socket.id} left room ${room}`);
    if(roomData[room]) {
        roomData[room].count -= 1;

        if(roomData[room].count <= 0) {
            delete roomData[room];
        } else {
            io.to(room).emit('updateRoomData', roomData[room])
        }
    }
    console.log(roomData)
}

const handleDisconnect = (io, socket, roomData, socketRoomMap) => {
    const roomId = socketRoomMap[socket.id];

    if(roomId && roomData[roomId]) {
        roomData[roomId].count -= 1;

        if(roomData[roomId].count <= 0) {
            delete roomData[roomId]
        } else [
            io.to(roomId).emit('updateRoomData', roomData[roomId])
        ]
    }
    console.log(roomData)
}

const handleRoomRequest = (io, socket, roomData) => {
    io.to(socket.id).emit('activeRooms', roomData);
}

module.exports = {
    handleConnection,
    handleJoinRoom,
    handleMessage,
    handleDraw,
    handleLeave,
    handleDisconnect,
    handleRoomRequest
}