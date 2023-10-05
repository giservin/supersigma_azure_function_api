// models/Desk.js
const { DataTypes } = require('sequelize');
const sequelizeMeeting = require('../config/databaseMeeting');
const MeetingBuilding = require('./MeetingBuilding');

const MeetingRoom = sequelizeMeeting.define('meeting_room', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  facility: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_location: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'meeting_room', // Set the table name to match the actual table name
  timestamps: false // Set to false if the table doesn't have timestamp columns
});

MeetingRoom.belongsTo(MeetingBuilding, {foreignKey: 'id_location', targetKey: 'id_location'});

module.exports = MeetingRoom;
