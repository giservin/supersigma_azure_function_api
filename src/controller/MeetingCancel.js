const MeetingActivity = require('../models/MeetingActivity');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const id_meeting = request.query.get("id_meeting");
    try {
        await MeetingActivity.destroy({
        where: {
            id : id_meeting
        }
        });
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ message: 'Booking cancelled successfully' })
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