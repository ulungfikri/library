const Sequelize = require('sequelize');
const Book = require('./books')
const db = {}

const sequelize = new Sequelize('db', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'data.sql'
})

db['Book'] = Book(sequelize, Sequelize)

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db