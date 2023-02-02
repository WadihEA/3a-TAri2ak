var express = require("express");
var router = express.Router();

const users = require('../controllers/user.controller');

router.get('/', users.onStart);
router.get('/login', users.login);
router.post('/UserLogin', users.UserLogin);
router.get('/register', users.registration);
router.post('/userRegistration', users.userRegistration);
router.get('/choice', users.choice);
router.get('/rideInfo', users.rideInfo);
router.post('/rideInfoSearch', users.rideInfoSeacrh);

module.exports = router; 