const MeetingRoom = require('../models/MeetingRoom');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const building = request.query.get("building");
    try {
        const list_meeting_room = await MeetingRoom.findAll({
          where: {
            id_location: building
          }
        });
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(list_meeting_room)
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