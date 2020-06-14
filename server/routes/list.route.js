const express = require('express');
const controller = require('../controllers/list.controller');
const router = new express.Router({ mergeParams: true });

router.get('/:id', controller.getById);

module.exports = router;