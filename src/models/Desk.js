// models/Desk.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Desk = sequelize.define('desk', {
  id_desk: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  location: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'desk', // Set the table name to match the actual table name
  timestamps: false // Set to false if the table doesn't have timestamp columns
});

module.exports = Desk;
