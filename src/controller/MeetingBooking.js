const MeetingActivity = require('../models/MeetingActivity');
const { Op } = require('sequelize');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { id, id_room, organizer, start, end } = await request.json();
    try {
        const IsMeetingAvailable = await MeetingActivity.findAll({
            where: {
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
                id_room
            }
        });
        // jika ada meeting booking pada jam tsb di room itu
        if(IsMeetingAvailable.length > 0) {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ message: 'Specified time has already been booked', bookedStatus: true})
            }
        }
        await MeetingActivity.create({
            id,
            id_room,
            organizer,
            start,
            end
        });
        return {
            headers: { "Content-Type": "application/json"},
            status: 201,
            body: JSON.stringify({ message: 'Booking created successfully', bookedStatus: false})
        }
    } catch (error) {
        context.log(`error in ${request.url} : ${error}`);
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}