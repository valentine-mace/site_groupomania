const express = require('express');
const bodyParser =  require("body-parser");
const path = require('path');
const mysql = require('mysql');
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

const db = mysql.createConnection({

  host: "127.0.0.1",

  user: "root",

  password: "root"

});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

//pour multer
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
// app.use('/api/auth', userRoutes);
// app.use('/api/sauces', saucesRoutes);

module.exports = app;