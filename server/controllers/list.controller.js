const utils = require('./utilities');
const listService = require('../services/list.service');

module.exports.getById = utils.getById(listService.getSingleList);