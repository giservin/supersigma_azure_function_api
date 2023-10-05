// models/DeskUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Desk = require('./Desk'); // Import the Desk model

const DeskUser = sequelize.define('desk_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_desk: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  user: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  business_unit: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'desk_user', // Set the table name to match the actual table name
  timestamps: false // Set to false if the table doesn't have timestamp columns
});

// Define the association with the Desk model
DeskUser.belongsTo(Desk, { foreignKey: 'id_desk', targetKey: 'id_desk' });

module.exports = DeskUser;
