const utils = require('./utilities');
const bookService = require('../services/book.service');

module.exports.getAll = utils.getAll(bookService.getAllBooks);