const { app } = require('@azure/functions');
const MeetingBooking = require('../controller/MeetingBooking')

app.http('bookmeeting', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'meetings/book_meeting',
    handler: MeetingBooking
});
