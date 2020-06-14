const Airtable = require('../config/airtable');
const bookService = require('./book.service');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const authors = base('Authors');

const defaultQuery = {
    pageSize: 10,
    sort: [{field: 'Name', direction: 'asc'}]
};

module.exports.getAllAuthors = async (query) => {
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
                        Books: await Promise.all(r._rawJson.fields.Books.map(async b => {
                            return {
                                id: b,
                                name: await bookService.getBookTitle(b)
                            }
                        }))
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

        authors.select(query).eachPage(processPage, processRecords);
    });
}

module.exports.getAuthorName = async (authorId) => {
    const record = await authors.find(authorId);

    return record._rawJson.fields.Name;
}