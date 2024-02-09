const {selectDrawer} = require('../middleware/selectDrawer')
const {getRandomWord} = require('../middleware/randomAnswer')
const {checkForWinningPhrase} = require('../middleware/answerEval')

const handleConnection = (io, socket) => {
    console.log(`User connected: ${socket.id}`)
}

const handleJoinRoom = (io, socket, room, roomData) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`)
    socket.emit(`Welcome to ${room}`)
    if (!roomData[room]) {
        roomData[room] = { count: 1 }
    } else {
        roomData[room].count += 1;
    }
    roomData[room].users.push(socket.id);
    console.log(roomData[room])
    io.to(room).emit("updateRoomData", roomData[room])

}

const handleMessage = (io, socket, room, message, roomData) => {
    console.log(`Received message from ${socket.id}: ${message} in room ${room}`)
    if(roomData[room].currentWord) {
        const correctBool = checkForWinningPhrase(message, roomData[room].currentWord);
        io.to(room).emit('broadcastMessage', { message }, correctBool);
    } else {
        io.to(room).emit('broadcastMessage', { message });
    }
    
}

const handleDraw = (io, socket, room, change, roomData) => {
    console.log(`Draw event from socket ${socket.id} in room: ${room}`)
    // console.log(change); //socket is able to read the change 
    io.to(room).emit('drawChange',  change )
}

const handleLeave = (io, socket, room, roomData) => {
    socket.leave(room);
    // console.log(`Socket ${socket.id} left room ${room}`);
    if (roomData[room]) {
        roomData[room].count -= 1;

        if (roomData[room].count <= 0) {
            delete roomData[room];
        } else {
            io.to(room).emit('updateRoomData', roomData[room])
        }

        // Get the index of the user who left
        const userIndex = roomData[room].users.indexOf(socket.id);
        // Check that they are present in the array and remove
        if (index !== -1) {
            roomData[room].users.splice(index, 1);
        }
    }

    // console.log(roomData)
}

const handleDisconnect = (io, socket, roomData, socketRoomMap) => {
    const roomId = socketRoomMap[socket.id];

    if (roomId && roomData[roomId]) {
        roomData[roomId].count -= 1;

        if (roomData[roomId].count <= 0) {
            delete roomData[roomId]
        } else[
            io.to(roomId).emit('updateRoomData', roomData[roomId])
        ]
    }
    console.log(roomData)
}

const handleRoomRequest = (io, socket, roomData) => {
    io.to(socket.id).emit('activeRooms', roomData);
}

const gameFunction = (io, socket, room, roomData) => {
    // 1.Choose word and store in room data as currentWord
    getRandomWord().then(word => {
        // Store word in the roomData
        roomData[room].currentWord = word;

        // Choose who draws
        selectDrawer(io, socket, room, roomData)

        // 

    }).catch(err => {
        console.error("Error fetching word:", err);
    })

    // 3. Start timer

    // 4. Intake guesses from users, validate against current word

    // 5. Assign scores for correct words based on time left, and display on front end.

    // 6. Loop if 2 or more people are still in room
}

module.exports = {
    handleConnection,
    handleJoinRoom,
    handleMessage,
    handleDraw,
    handleLeave,
    handleDisconnect,
    handleRoomRequest,
    gameFunction
}