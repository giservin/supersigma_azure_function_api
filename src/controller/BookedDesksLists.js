const Desk = require('../models/Desk.js');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    try {
        const desk = await Desk.findAll({
        });
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(desk)
        }
    } catch (error) {
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}