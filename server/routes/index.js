const express = require('express');

const authorRoutes = require('./author.route');
const bookRoutes = require('./book.route');

const router = new express.Router({
    mergeParams: true
});

router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);

module.exports = router;