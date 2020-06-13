const Airtable = require('../config/airtable');

const base = Airtable.base('appfvxDNiZJ9loPrE');
const authors = base('Authors');

module.exports.getAuthorName = async (authorId) => {
    const record = await authors.find(authorId);

    return record._rawJson.fields.Name;
}