const express = require('express');
const controller = require('../controllers/book.controller');
const router = new express.Router({ mergeParams: true });

router.get('', controller.getAll);
router.get('/current', controller.getCurrentlyReading);

module.exports = router;