const express = require('express');
const router = express.Router();
const dataController = require('../controller/data.controller');
const middleware = require('../middleware/data.middleware')

router.post('/add-data',middleware.add_data, dataController.add_data);
router.post('/get-data',dataController.get_data);
router.post('/update-data',dataController.update_data);

module.exports = router;