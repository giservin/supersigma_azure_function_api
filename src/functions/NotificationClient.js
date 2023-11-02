const { app } = require('@azure/functions');
const CheckInNotifReceive = require('../controller/CheckInNotifReceive')

app.http('NotificationClient', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'notifications',
    handler: CheckInNotifReceive
});
