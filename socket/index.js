const User = require('./models/User');
const Account = require('./models/Account');
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
        const account = Account.find({ownerId: newUserId});
        const freinds = [...account.followings];
        const activeFreinds = activeUsers.filter((user) => freinds.includes(user.userId));
        io.to(socket.id).emit("getActiveUsers", activeFreinds);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const {recieverId} = data;
        const user = activeUsers.find((user) => user.userId === recieverId);
        if(user){
            io.to(user.socketId).emit('recieveMessage', data);
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        
        io.emit('getUsers', activeUsers);
    })
})