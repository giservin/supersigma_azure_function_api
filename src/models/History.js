const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Replace with your Sequelize instance

const History = sequelize.define('History', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    timeCreated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'history', // Specify the actual table name if different
    timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt columns
});

module.exports = History;
