const Desk = require('../models/Desk.js');
const DeskUser = require('../models/DeskUser');
const sequelize = require('../config/database');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const tableCode = request.query.get('table_code');
    const t = await sequelize.transaction(); // Start a transaction

    try {
        const booking = await DeskUser.findOne({
        where: {
            id_desk: tableCode
        },
        transaction: t
        });

        if (!booking) {
        await t.rollback(); // Rollback the transaction
        return {
            headers: { "Content-Type": "application/json"},
            status: 404,
            body: JSON.stringify({ message: 'Booking not found' })
        }
        }

        await DeskUser.destroy({
        where: {
            id_desk: tableCode
        },
        transaction: t
        });

        // Update status in Desk table to false for the same table_code
        await Desk.update(
        { status: false },
        {
            where: {
            id_desk: tableCode
            },
            transaction: t
        }
        );

        await t.commit(); // Commit the transaction

        return {
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ message: 'Booking cancelled successfully' })
        }
    } catch (error) {
        await t.rollback(); // Rollback the transaction if an error occurs
        return {
            headers: { "Content-Type": "application/json"},
            status: 500,
            body: JSON.stringify({error: 'An error occurred'})
        }
    }
}