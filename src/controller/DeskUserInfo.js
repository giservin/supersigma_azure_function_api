const DeskUser = require('../models/DeskUser');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const userId = request.params.user_id;
    try{
        const BookedUser = await DeskUser.findAll({
        where: {
            user: userId
        }
        });
        if(BookedUser.length > 0){
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({bookingStatus: true, tableCode: BookedUser[0].id_desk, booking_date: BookedUser[0].booking_date})
            }
        } else {
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({bookingStatus: false, message: 'User hasnt booked a table', tableCode: "0", booking_date: "0"})
            }
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