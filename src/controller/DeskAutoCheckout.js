const Desk = require('../models/Desk.js');
const DeskUser = require('../models/DeskUser');
const sequelize = require('../config/database');

module.exports = async (myTimer, context) => {
    context.log(`Checking Out All Booked Desk at 00:00`);

    const t = await sequelize.transaction(); // Start a transaction

    try {
        await DeskUser.destroy({
        where: {},
        transaction: t
        });

        // Update status in Desk table to false for the same table_code
        await Desk.update(
        { status: false },
        {
            where: {},
            transaction: t
        }
        );

        await t.commit(); // Commit the transaction
    } catch (error) {
        await t.rollback(); // Rollback the transaction if an error occurs
    }
}