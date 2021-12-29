const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller');
const middleware = require('../middleware/note.middleware')

router.post('/add-note',middleware.addNote,noteController.addNote);
router.post('/get-note',middleware.getNote,noteController.getNote);
router.post('/delete-note',middleware.deleteNote,noteController.deleteNote);
router.post('/edit-note',middleware.editNote,noteController.editNote);

module.exports = router;