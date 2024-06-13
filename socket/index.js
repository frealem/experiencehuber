const User = require('./models/User');
const Account = require('./models/Account');
const dbConnection = require('./Config/dbConnection');
dbConnection();
const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = [];

io.on('connection', (socket)=> {
    //add new user
    socket.on("addNewUser", async (newUserId) => {
        if(!activeUsers.some((user) => user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id,
            });
        }
        const account = await Account.findOne({ownerId: newUserId});
        let activeFreinds = [];
        if(account){
            const freinds = [...account.followings];
            activeFreinds = activeUsers.filter((user) => freinds.includes(user.userId));
        }
        console.log(activeUsers)
        io.to(socket.id).emit("getActiveUsers", activeUsers);
        console.log("success");
    })

    //send message
    socket.on('sendMessage', (data) => {
        const {recieverId} = data;
        console.log(activeUsers)
        activeUsers.forEach((user)=> {
            console.log(user.userId);
            console.log(recieverId);
            if(user.userId == recieverId){
                console.log('console')
                io.to(user.socketId).emit('recieveMessage', data);
            }
        }) 
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        
        io.emit('getUsers', activeUsers);
    })
})