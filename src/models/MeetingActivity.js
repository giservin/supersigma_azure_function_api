// models/DeskUser.js
const { DataTypes } = require('sequelize');
const sequelizeMeeting = require('../config/databaseMeeting');
const MeetingRoom = require('./MeetingRoom'); // Import the Desk model

const MeetingActivity = sequelizeMeeting.define('meeting_activity', {
  id: {
    type: DataTypes.STRING(255),
    primaryKey: true
  },
  id_room: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  organizer: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'meeting_activity', // Set the table name to match the actual table name
  timestamps: false // Set to false if the table doesn't have timestamp columns
});

// Define the association with the Desk model
MeetingActivity.belongsTo(MeetingRoom, { foreignKey: 'id_room', targetKey: 'id' });

module.exports = MeetingActivity;
