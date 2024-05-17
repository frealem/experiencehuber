const express = require('express');
const dotenv = require('dotenv').config();
const socketio = require('socket.io');

const dbconnection = require('./Config/dbConnection');
const cors=require('cors')

dbconnection();
const port = process.env.PORT || 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('Modules/PostManagmentModule/PostImages/'));
app.use('/api', require('./Routes/generalRoutes'));
const server = app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})

const io = socketio(server);
module.exports = io;