const express = require('express');

const bookRoutes = require('./book.route');

const router = new express.Router({
    mergeParams: true
});

router.use('/books', bookRoutes);

module.exports = router;