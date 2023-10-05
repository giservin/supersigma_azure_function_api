const { app } = require('@azure/functions');
const telkomNews = require('../controller/TelkomNews')

app.http('getnewstelkom', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'get_news',
    handler: telkomNews
});
