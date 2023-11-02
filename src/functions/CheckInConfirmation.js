const { app } = require('@azure/functions');
const CheckConfirm = require('../controller/CheckConfirm')

app.http('CheckInConfirmation', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'meetings/check-confirm',
    handler: CheckConfirm
});
