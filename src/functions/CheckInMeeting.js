const { app } = require('@azure/functions');
const ScanQRMeeting = require('../controller/ScanQRMeeting')

app.http('CheckInMeeting', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'meetings/scan-check-in',
    handler: ScanQRMeeting
});
