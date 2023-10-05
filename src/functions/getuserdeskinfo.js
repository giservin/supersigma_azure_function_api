const { app } = require('@azure/functions');
const DeskUserInfo = require('../controller/DeskUserInfo')

app.http('getuserdeskinfo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'desks/users/{user_id}',
    handler: DeskUserInfo
});
