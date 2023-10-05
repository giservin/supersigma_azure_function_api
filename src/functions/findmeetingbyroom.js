const { app } = require('@azure/functions');
const ByRoomMeetingFinder = require('../controller/ByRoomMeetingFinder')

app.http('findmeetingbyroom', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'meetings/find_meeting_by_room',
    handler: ByRoomMeetingFinder
});
