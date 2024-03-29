const express = require('express');
const dotenv = require('dotenv').config();
const socketio = require('socket.io');
const http = require('http');

const dbconnection = require('./Config/dbConnection');

dbconnection();
const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use('/api', require('./Routes/generalRoutes'));
const server = app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})

const io = socketio(server);
module.exports = io;