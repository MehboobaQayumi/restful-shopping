require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')


const { mongoose } = require('./db.js');
var proController = require('./controllers/productController.js');

var app = express();
app.use(bodyParser.json());

//app.listen(3000, () => console.log('Server started at port : 3000'));
http.createServer(app).listen(process.env.PORT || 3000)

app.use('/products', proController);
