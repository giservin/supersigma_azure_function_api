const { app } = require('@azure/functions');
const UserMeetingRoom = require('../controller/UserMeetingRoom')

app.http('UserMeetRoomCheckStatus', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'meetings/user_check_in_status',
    handler: UserMeetingRoom
});