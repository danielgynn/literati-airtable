const utils = require('./utilities');
const listService = require('../services/list.service');

module.exports.getAll = utils.getAll(listService.getAllLists);
module.exports.getById = utils.getById(listService.getSingleList);