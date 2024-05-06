const io = require('socket.io')(8800, {
    cors: {
        origin: ""
    }
})

let activeUsers;

io.on('connection', (socket)=> {
    //add new user
    socket.on("addNewUser", (newUserId) => {
        if(!activeUsers.some((user) => user.id === newUserId)){
            activeUsers.push({
                uesrId: newUserId,
                socketId: socket.id,
            });
        }
        io.emit("getUsers", activeUsers);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const {recieverId} = data;
        const user = activeUsers.find((user) => user.userId === recieverId);
        if(user){
            io.to(user.socketId).emit('reciveMessage', data);
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getUsers', activeUsers); 
    })
})