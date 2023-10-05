const { app } = require('@azure/functions');
const MeetingCancel = require('../controller/MeetingCancel')

app.http('cancelmeeting', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'meetings/cancel',
    handler: MeetingCancel
});
