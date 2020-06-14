const Airtable = require('../config/airtable');
const authorService = require('./author.service');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const books = base('Books');

const defaultQuery = {
    pageSize: 10,
    sort: [{field: 'Title', direction: 'asc'}]
};

module.exports.getAllBooks = async (query) => {
    let records = [];

    if (Object.keys(query).length === 0) {
        query = defaultQuery;
    }

    return new Promise((resolve, reject) => {
        if (records.length > 0) {
            resolve({
                data: records,
                count: records.length
            });
        }

        const processPage = (partialRecords, fetchNextPage) => {
            records = [...records, ...partialRecords];
            fetchNextPage();
        };

        const processRecords = async (err) => {
            if (err) {
                reject(err);

                return;
            }

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

            resolve({
                data,
                count: data.length
            });
        };

        if (query.sortField) {
            query.sort = [{
                field: query.sortField,
                direction: query.sortDirection || 'asc'
            }];

            delete query.sortField;
            delete query.sortDirection;
        }

        books.select(query).eachPage(processPage, processRecords);
    });
}

module.exports.getBookTitle = async (bookId) => {
    const record = await books.find(bookId);

    return record._rawJson.fields.Title;
}