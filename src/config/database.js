// config/database.js
const { Sequelize } = require('sequelize');

const hostName = process.env.MYSQL_HOST;
const userName = process.env.MYSQL_DESK_USER;
const password = process.env.MYSQL_DESK_PASSWORD;

const sequelize = new Sequelize('desk', userName, password, {
  host: hostName,
  dialect: 'mysql'
});

module.exports = sequelize;
