const MeetingActivity = require('../models/MeetingActivity');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { id } = await request.json();
    try {
        await MeetingActivity.update({
            checked_in: true
        },
            {
                where: {
                    id
                }
            }
        );
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({update_status: true})
        }
        // if gak ketemu, maka akan membalikan status available, if ketemu
    } catch (error) {
        context.log(`error in ${request.url} : ${error}`);
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}