const express = require('express');
const dotenv = require('dotenv').config();
const socketio = require('socket.io');
const bodyParser = require('body-parser')

const dbconnection = require('./Config/dbConnection');
const cors=require('cors')

dbconnection();
const port = process.env.PORT || 3001
const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json({ limit: '40mb' })); // Increase the limit to 5MB
// app.use(bodyParser.urlencoded({ extended: true, limit: '40mb' }));
app.use('/uploads', express.static('Modules/PostManagmentModule/PostImages/'));
app.use('/api', require('./Routes/generalRoutes'));
const server = app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})

const io = socketio(server);
module.exports = io;