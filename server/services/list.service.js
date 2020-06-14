const Airtable = require('../config/airtable');
const bookService = require('./book.service');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const lists = base('Lists');

const defaultQuery = {
    pageSize: 10,
    sort: [{field: 'Name', direction: 'asc'}]
};

module.exports.getAllLists = async (query) => {
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
                        ...r._rawJson.fields
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

        lists.select(query).eachPage(processPage, processRecords);
    });
}

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