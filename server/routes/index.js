const express = require('express');

const authorRoutes = require('./author.route');
const bookRoutes = require('./book.route');
const listRoutes = require('./list.route');

const router = new express.Router({
    mergeParams: true
});

router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);
router.use('/lists', listRoutes);

module.exports = router;