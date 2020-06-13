const Airtable = require('../config/airtable');
const authorService = require('./author.service');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const books = base('Books');

module.exports.getAllBooks = async (query) => {
    const records = await books.select({
        pageSize: 5,
        sort: [{field: 'Title', direction: 'asc'}]
    }).all();

    const data = await Promise.all(records.map(async r => {
        return {
            ...r._rawJson,
            id: r.id,
            fields: {
                ...r._rawJson.fields,
                Author: [{
                    id: r._rawJson.fields.Author[0],
                    name: await authorService.getAuthorName(r._rawJson.fields.Author[0])
                }]
            }
        };
    }));

    return {
        data,
        count: records.length
    };
}