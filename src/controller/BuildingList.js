const MeetingBuilding = require('../models/MeetingBuilding');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const list_building = await MeetingBuilding.findAll();
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(list_building)
        }
    } catch(err) {
        context.log(`error in ${request.url} : ${err}`);
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}