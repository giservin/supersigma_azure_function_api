const { app } = require('@azure/functions');
const DeskAutoCheckout = require('../controller/DeskAutoCheckout');

app.timer('autoCheckoutDesk', {
    schedule: '0 0 * * *',
    handler: DeskAutoCheckout
});
