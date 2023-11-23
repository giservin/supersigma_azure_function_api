const Desk = require('../models/Desk.js');
const DeskUser = require('../models/DeskUser');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const deskId = request.params.desk_id;
    try {
        const desk = await Desk.findByPk(deskId);
        if (desk) {
        if(desk.status == true){
            try {
                const BookedData = await DeskUser.findAll({
                where: {
                    id_desk: desk.id_desk
                }
                });
                // if desk is booked by other person then the status will be false
                return {
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({status: false, user: BookedData[0].user, business_unit: BookedData[0].business_unit, table_code: desk.id_desk, location: desk.location, booking_date: BookedData[0].booking_date})
                };
            } catch (error) {
                return {
                    headers: { "Content-Type": "application/json"},
                    status: 500,
                    body: JSON.stringify({error: 'An error occurred'})
                }
            }
        } else {
            // if desk is empty, then the status will be true
            return {
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({status: true, table_code: desk.id_desk, location: desk.location})
            }
        }
        } else {
        return {
            headers: { "Content-Type": "application/json"},
            status: 404,
            body: JSON.stringify({ message: 'Desk not found' })
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