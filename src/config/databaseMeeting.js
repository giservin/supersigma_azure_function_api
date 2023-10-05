// config/database.js
const { Sequelize } = require('sequelize');

const hostName = process.env.MYSQL_HOST;
const userName = process.env.MYSQL_MEETING_USER;
const password = process.env.MYSQL_MEETING_PASSWORD;

const sequelizeMeeting = new Sequelize('meetingroom', userName, password, {
  host: hostName,
  dialect: 'mysql'
});

module.exports = sequelizeMeeting;
