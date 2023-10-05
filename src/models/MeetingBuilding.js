// models/Desk.js
const { DataTypes } = require('sequelize');
const sequelizeMeeting = require('../config/databaseMeeting');

const MeetingBuilding = sequelizeMeeting.define('location', {
  id_location: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'location', // Set the table name to match the actual table name
  timestamps: false // Set to false if the table doesn't have timestamp columns
});

module.exports = MeetingBuilding;
