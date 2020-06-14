const utils = require('./utilities');
const bookService = require('../services/book.service');

module.exports.getAll = utils.getAll(bookService.getAllBooks);
module.exports.getCurrentlyReading = utils.getAll(bookService.getCurrentlyReading);