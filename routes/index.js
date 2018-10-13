var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');

router.get('/', HomeController.Index);

module.exports = router;