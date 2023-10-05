const { app } = require('@azure/functions');
const MeetingFinder = require('../controller/MeetingFinder')

app.http('findmeetingtimes', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'meetings/find_meeting',
    handler: MeetingFinder
});
