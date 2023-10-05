const { app } = require('@azure/functions');
const BookedMeetingLists = require('../controller/BookedMeetingLists')

app.http('listbookedmeeting', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'meetings/list_booked_meeting',
    handler: BookedMeetingLists
});
