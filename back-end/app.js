const express = require('express');
const bodyParser =  require("body-parser");
const userRoutes = require('./routes/users');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    console.log(filename);
    cb(null, Date.now()+ path.extname(file.originalname) )
  }
})

const upload = multer({storage: storage});

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

//routes
app.use('/users', userRoutes);


module.exports = app;