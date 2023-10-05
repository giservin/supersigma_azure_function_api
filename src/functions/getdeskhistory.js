const { app } = require('@azure/functions');
const DeskHistoryGet = require('../controller/DeskHistoryGet')

app.http('getdeskhistory', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'desks/history/{user_id}',
    handler: DeskHistoryGet
});
