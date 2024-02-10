const { selectDrawer } = require('../middleware/selectDrawer')
var timeLeft = "30";
const handleTimer = (io, socket, room, roomData, timeLeft) => {
    console.log(timeLeft);
    // while (timeLeft > 0) {


    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
                console.log("Do I Work?");
                timeLeft--;
                // timeEl.textContent = "Timer: " + timeLeft;

                if (timeLeft <= 0) {
                    // Stops execution of action at set interval
                    clearInterval(timerInterval);
                    // Calls function to create and append image
                }
                console.log("data : " + timeLeft);
                io.to(room).emit('startTime', timeLeft)
            },
            1000);
    }
    // console.log("loop : " + timeLeft);
    setTime();
    // }
    // io.to(room).emit('startTime', {
    //     timeLeft
    // });

}

// handleTimer();
const handleConnection = (io, socket) => {
    console.log(`User connected: ${socket.id}`)
}

const handleJoinRoom = (io, socket, room, roomData) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
    socket.emit(`Welcome to ${room}`);

    if (!roomData[room]) {
        roomData[room] = { count: 1, users: [] };
    } else {
        roomData[room].count += 1;
    }

    roomData[room].users.push(socket.id);
    console.log(roomData[room]);

    io.to(room).emit("updateRoomData", roomData[room]);

    handleTimer(io, socket, room, roomData, timeLeft);
}


const handleMessage = (io, socket, room, message, roomData) => {
    console.log(`Received message from ${socket.id}: ${message} in room ${room}`)
    io.to(room).emit('broadcastMessage', { message })
    selectDrawer(io, socket, room, roomData);
}

const handleDraw = (io, socket, room, change, roomData) => {
    console.log(`Draw event from socket ${socket.id} in room: ${room}`)
        // console.log(change); //socket is able to read the change 
    io.to(room).emit('drawChange', change)
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
        } else [
            io.to(roomId).emit('updateRoomData', roomData[roomId])
        ]
    }
    console.log(roomData)
}

const handleRoomRequest = (io, socket, roomData) => {
    io.to(socket.id).emit('activeRooms', roomData);
}

const gameFunction = (io, socket, roomData) => {
    // 1.Choose word and store in room data as currentWord

    // 2. Choose who draws

    // 3. Start timer

    handleTimer();

    // function setTime() {
    //     // Sets interval in variable
    //     var timerInterval = setInterval(function() {
    //         timeLeft--;
    //         // timeEl.textContent = "Timer: " + secondsLeft;

    //         if (secondsLeft <= 0) {
    //             // Stops execution of action at set interval
    //             clearInterval(timerInterval);
    //             // Calls function to create and append image
    //         }
    //     }, 1000);
    // }
    // setTime();
    // console.log(secondsLeft);

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
    handleTimer
}
