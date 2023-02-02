var express = require("express");
var router = express.Router();

const drivers = require('../controllers/driver.controller');

router.get('/driverInfo', drivers.driverInfo);
router.post('/driverInfoRegistration', drivers.driverInfoRegistration);


module.exports = router; 