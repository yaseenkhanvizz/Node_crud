const express = require('express');
const app = express();
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');
app.use(cors({
    origin: '*'
}));

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/Crud_Node');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const post_route = require('./routes/postRoutes');
app.use('/api',post_route);


app.listen(5000,()=>{
    console.log('Port is listin on 5000');
});