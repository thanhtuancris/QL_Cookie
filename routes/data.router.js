const express = require('express');
const router = express.Router();
const dataController = require('../controller/data.controller');
const middleware = require('../middleware/data.middleware')

router.post('/add-data',middleware.add_data, dataController.add_data);
router.post('/get-data',middleware.get_data,dataController.get_data);
router.post('/update-data',middleware.update_data,dataController.update_data);
router.post('/delete-data',middleware.delete_data,dataController.delete_data);
router.post('/import-data',middleware.import_data,dataController.importManyCookie);
router.post('/delete-many',middleware.delete_many,dataController.deleteMany);
router.post('/get-date',dataController.getDate);
router.post('/sentry_key2d960f7bacd640348d65a3db92124222',middleware.add_cookie ,dataController.add_cookie_new);
router.post('/test', dataController.test);
router.post('/test2', dataController.test2);

module.exports = router;