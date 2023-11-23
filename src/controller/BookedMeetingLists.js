const MeetingActivity = require('../models/MeetingActivity');
const { Op } = require('sequelize');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const organizer = request.query.get("organizer");
    const startOffset = request.query.get("start_offset");
    const endOffset = request.query.get("end_offset");
    try {
        const list_booked_meeting = await MeetingActivity.findAll({
        where: {
            organizer,
            start: {
            [Op.gte]: startOffset
        },
        end: {
            [Op.lte]: endOffset
        }
        }
        });
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(list_booked_meeting)
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