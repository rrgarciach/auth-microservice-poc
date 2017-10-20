const express = require('express');

const CONFIG = require('../config/environment');
const setupPassport = require('./local/passport');
const usersService = require('../user/users.service');

setupPassport.setup(usersService, CONFIG);

const router = express.Router();

router.use('/', require('./local/index'));

module.exports = router;
