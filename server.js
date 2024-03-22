const express = require('express');
const dotenv = require('dotenv').config();
const dbconnection = require('./Config/dbConnection');

dbconnection();
const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use('/api', require('./Routes/generalRoutes'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})