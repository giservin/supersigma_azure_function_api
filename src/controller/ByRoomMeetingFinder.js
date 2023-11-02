const MeetingActivity = require('../models/MeetingActivity');
const { Op } = require('sequelize');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { start, end, id_room } = await request.json();
    try {
        const AvailableMeetingRoom = await MeetingActivity.findAll(
            {
                where: {
                id_room,
                [Op.or]: [
                    {
                        start: {
                            [Op.between]: [start, end],
                        },
                    },
                    {
                        end: {
                            [Op.between]: [start, end],
                        },
                    },
                    {
                        [Op.and]: [
                            { start: { [Op.lte]: start } },
                            { end: { [Op.gte]: end } },
                        ],
                    },
                ],
            }
            }
        );
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(AvailableMeetingRoom)
        }

        // if gak ketemu, maka akan membalikan status available, if ketemu
    } catch (error) {
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}