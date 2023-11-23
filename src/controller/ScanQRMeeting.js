const MeetingActivity = require('../models/MeetingActivity');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');
const SuperNotificationQueue = require('../config/SuperNotificationQueue');

const notificationRecipient = new SuperNotificationQueue(`https://rgsuperappa6e1.queue.core.windows.net/`);

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { current_time, id_room, organizer } = await request.json();
    // console.log(current_time);
    const currentTime = DateTime.fromISO(current_time);
    // console.log(currentTime);
    try {
        const CurrentMeetingDetail = await MeetingActivity.findAll(
            {
                where: {
                [Op.and]:  [
                    { start: { [Op.lte]: current_time } },
                    { end: { [Op.gte]: current_time } },
                ],
                id_room
            }
            }
        );
        // context.log(CurrentMeetingDetail[0]);
        // context.log(currentTime);
        // context.log(CurrentMeetingDetail[0].start)
        // context.log(DateTime.fromJSDate(CurrentMeetingDetail[0].start).plus({minutes: 15}));
        if (CurrentMeetingDetail.length > 0){
            if(currentTime  > DateTime.fromJSDate(CurrentMeetingDetail[0].start).plus({minutes: 15}) 
               && CurrentMeetingDetail[0].checked_in == false){
                await MeetingActivity.destroy({
                    where: {
                        id: CurrentMeetingDetail[0].id,
                        checked_in: false
                    }
                })
                // setelah ini ngirim notif
                const queueName = CurrentMeetingDetail[0].organizer.replace(/[^a-zA-Z0-9]/g,'');
                await notificationRecipient.createNotificationUser(queueName);
                await notificationRecipient.addNotification(queueName, {cancelStatus: true, checkIn: false, meetingDetails: CurrentMeetingDetail[0]});
                
                return {
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({bookstatus: false})
                }
            }
            else if(CurrentMeetingDetail[0].organizer == organizer) {
                return {
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        bookstatus: true,
                        organizer_status: true,
                        meeting_details: CurrentMeetingDetail[0]
                    })
                }
            }
            return {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookstatus: true,
                    organizer_status: false,
                    meeting_details: CurrentMeetingDetail[0]
                })
            }
        } else {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({bookstatus: false})
            }
        }
        // if gak ketemu, maka akan membalikan status available, if ketemu
    } catch (error) {
        context.log(`error in ${request.url} : ${error}`);
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: error})
        }
    }
}