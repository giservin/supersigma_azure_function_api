const { app } = require('@azure/functions');
const DeskCancel = require('../controller/DeskCancel')

app.http('checkoutDesk', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'desks/cancel',
    handler: DeskCancel
});
