const { Router } = require('express');
const mainPages = Router();


const {
  mainGet
} = require('../controllers/mainLinks')


mainPages.route('/').get(mainGet)//.post()
module.exports = mainPages;
