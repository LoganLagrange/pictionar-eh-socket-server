function selectDrawer(io, socket, room, roomData) {
    // Use the users array to select a random user
    const selectedUserIndex = Math.floor(Math.random() * roomData[room].users.length);
    // Grab that users id
    const selectedUserId = users[selectedUserIndex];

    const drawer = true;

    // Send true value to selected user
    io.to(selectedUserId).emit('userSelect', drawer);

    // Filter out the selected to user to avoid duplicate messages
    const otherUsers = roomData[room].users.filter(userId => {
        userId !== selectedUserId
    })
    // Send false value to other users
    otherUsers.forEach(userId => {
        if(userId !== selectedUserId) {
            io.to(userId).emit('userSelect', {drawer:false});
        }
    });
};

module.exports = {selectDrawer}