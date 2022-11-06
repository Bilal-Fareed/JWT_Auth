const express = require('express');
const { signup, signin } = require('../controllers/userController');
const userRouter = express.Router();
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

userRouter.post('/signup',jsonParser,signup)

userRouter.post('/signin',jsonParser,signin);

module.exports = userRouter;