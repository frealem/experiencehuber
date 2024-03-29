const express = require('express');
const dotenv = require('dotenv').config();
const dbconnection = require('./Config/dbConnection');
const cors=require('cors')

dbconnection();
const port = process.env.PORT || 3001
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', require('./Routes/generalRoutes'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})