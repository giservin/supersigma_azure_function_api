const { app } = require('@azure/functions');
const DeskBooking = require('../controller/DeskBooking')

app.http('bookDesk', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'desks/book',
    handler: DeskBooking
});
