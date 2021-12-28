const express = require('express');
const router = express.Router();
const accountController = require('../controller/account.controller');
const middleware = require('../middleware/account.middleware')

router.post('/login', accountController.login);

module.exports = router;