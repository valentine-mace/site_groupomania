const express = require('express');
const bodyParser =  require("body-parser");
const userRoutes = require('./routes/users');
const path = require('path');
// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     console.log(filename);
//     const extension = MIME_TYPES[file.mimetype];
//     cb(null, Date.now()+ path.extname(file.originalname) + extension );
//   }
// })

// const upload = multer({storage: storage});

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

app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/users', userRoutes);


module.exports = app;