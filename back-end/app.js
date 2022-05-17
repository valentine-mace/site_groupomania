const express = require('express');
const bodyParser =  require("body-parser");
const userRoutes = require('./routes/users');
// const dotenv = require("dotenv");
// dotenv.config();


const app = express();

//pour problème CORS
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());
app.use(express.json());

//pour multer
//app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/users', userRoutes);


module.exports = app;