const utils = require('./utilities');
const authorService = require('../services/author.service');

module.exports.getAll = utils.getAll(authorService.getAllAuthors);