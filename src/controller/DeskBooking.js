const Desk = require('../models/Desk.js');
const DeskUser = require('../models/DeskUser');
const History = require('../models/History');
const sequelize = require('../config/database');

module.exports = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const { id_desk, user, booking_date, business_unit, bookingStatus, table_code } = await request.json();

    const t = await sequelize.transaction(); // Start a transaction

    try {
        if (bookingStatus === true) {
        // Delete existing booking for the user
        await DeskUser.destroy({
            where: {
            user
            },
            transaction: t
        });

        // Update status in Desk table to false for the same table_code
        await Desk.update(
            { status: false },
            {
            where: {
                id_desk: table_code
            },
            transaction: t
            }
        );
        }

        // Insert new booking
        const booking = await DeskUser.create(
        {
            id_desk,
            user,
            booking_date,
            business_unit
        },
        { transaction: t }
        );

        // Update status in Desk table to true for the same table_code
        await Desk.update(
        { status: true },
        {
            where: {
            id_desk
            },
            transaction: t
        }
        );

        await History.create(
        {
            user,
            code: id_desk,
            timeCreated: booking_date,
            category: "desk"
        },
        { transaction: t }
        );

        await t.commit(); // Commit the transaction

        return {
            headers: { "Content-Type": "application/json"},
            status: 201,
            body: JSON.stringify({ message: 'Booking created successfully', booking })
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