const { app } = require('@azure/functions');
const CheckInNotifReceive = require('../controller/CheckInNotifReceive')

app.http('UserCheckInNotif', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'meetings/notifications',
    handler: CheckInNotifReceive
});