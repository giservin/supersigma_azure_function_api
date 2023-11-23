const MeetingActivity = require('../models/MeetingActivity');
const { DateTime } = require('luxon');
const { Op } = require('sequelize');
const MeetingRoom = require('../models/MeetingRoom');


module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { organizer, current_time } = await request.json();
    // const today_offset = DateTime.now().setZone('Asia/Bangkok').startOf('day');

    const currentTime = DateTime.fromISO(current_time);
    const today_offset = currentTime.minus({days: 1});
    const tomorrow_offset = currentTime.plus({days: 1});
    console.log(today_offset.toISO());
    console.log(tomorrow_offset.toISO())
    try {
        const CurrentMeeting = await MeetingActivity.findAll(
            {
                where: {
                    organizer,
                    start: {
                        [Op.gte]: today_offset.toISO()
                    },
                    end: {
                        [Op.lte]: tomorrow_offset.toISO()
                    },
                    checked_in: false
                }
            }
        );
        if(CurrentMeeting.length == 0) {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({imminent_meeting: false, isCancelled: false})
            }
        }
        const ImminentMeeting = CurrentMeeting.filter(meeting => {
            let duration = DateTime.fromJSDate(meeting.end).diff(DateTime.fromJSDate(meeting.start))
            if(duration.as("minutes") >= 15) duration = 15;
            return currentTime >= DateTime.fromJSDate(meeting.start) && 
                   currentTime <= DateTime.fromJSDate(meeting.start).plus({minutes: duration})
        });
        if(ImminentMeeting.length == 0) {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({imminent_meeting: false, isCancelled: true})
            }
        }
        const RoomCheckIn = await MeetingRoom.findByPk(ImminentMeeting[0].id_room);
        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    imminent_meeting: true, 
                    isCancelled: false, 
                    id_meeting: ImminentMeeting[0].id,
                    id_room: ImminentMeeting[0].id_room,
                    start: ImminentMeeting[0].start,
                    end: ImminentMeeting[0].end,
                    room_name: RoomCheckIn.name,
                    checked_in: ImminentMeeting[0].checked_in
                })
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