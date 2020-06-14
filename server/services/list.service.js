const Airtable = require('../config/airtable');
const bookService = require('./book.service');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const lists = base('Lists');

const defaultQuery = {
    pageSize: 10,
    sort: [{field: 'Title', direction: 'asc'}]
};

module.exports.getSingleList = async (query) => {
    const list = await lists.find(query.id);

    return {
        ...list._rawJson,
        id: list.id,
        fields: {
            ...list._rawJson.fields,
            Books: await Promise.all(list._rawJson.fields.Books.map(async b => {
                return {
                    id: b,
                    name: await bookService.getSingleBook({id: b})
                }
            }))
        }
    };
}