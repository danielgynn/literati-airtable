const Airtable = require('airtable');

Airtable.configure({
    apiKey: process.env.API_KEY
});

module.exports = Airtable;