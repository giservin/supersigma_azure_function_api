const MeetingActivity = require('../models/MeetingActivity');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');
const SuperNotificationQueue = require('../config/SuperNotificationQueue');

const notificationRecipient = new SuperNotificationQueue(`https://rgsuperappa6e1.queue.core.windows.net/`)

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { start, end, current_time } = await request.json();
    const currentTime = DateTime.fromISO(current_time);
    try {
        const AvailableMeetingRoom = await MeetingActivity.findAll(
            {
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
            }
            }
        );
        if (AvailableMeetingRoom.length > 0){

            const RoomAvailability = AvailableMeetingRoom.filter(async meeting => {
                if(currentTime  > DateTime.fromJSDate(meeting.start).plus({minutes: 15})){
                    if(!meeting.checked_in) {
                        await MeetingActivity.destroy({
                            where:{
                                id: meeting.id
                            }
                        })
                        // harusnya setelah ini send notif (pake azure queue)
                        // const queueName = `${meeting.organizer.split(".")[0]}-${meeting.organizer.split(".")[1]}`;
                        const queueName = meeting.organizer.replace(/[^a-zA-Z0-9]/g,'');
                        await notificationRecipient.createNotificationUser(queueName);
                        await notificationRecipient.addNotification(queueName, {cancelStatus: true, checkIn: false, meetingDetails: meeting});

                    }
                    else return meeting
                }
                return meeting
            });
            if(RoomAvailability.length == 0) {
                return {
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({bookstatus: false})
                }
            }
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({bookstatus: true, roomInfo: RoomAvailability})
            }
        } else {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({bookstatus: false})
            }
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