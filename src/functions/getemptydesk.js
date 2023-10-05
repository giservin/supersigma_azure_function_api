const { app } = require('@azure/functions');
const deskGet = require('../controller/DeskGet');

app.http('getemptydesk', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'desks/{desk_id}',
    handler: deskGet
});