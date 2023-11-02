const { app } = require('@azure/functions');
const BookedDesksLists = require('../controller/BookedDesksLists')

app.http('listAllBookedDesk', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'list_booked_desks',
    handler: BookedDesksLists
});
