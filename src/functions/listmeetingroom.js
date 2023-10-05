const { app } = require('@azure/functions');
const MeetingRoomLists = require('../controller/MeetingRoomLists')

app.http('listmeetingroom', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'meetings/list_meeting_room',
    handler: MeetingRoomLists
});
