require('dotenv').config()

const {
  DBHOST,
  DBNAME,
  DBUSER,
  DBPASS,
  DBPORT,
  SYSTEMDEFAULT,
  APPPORT,
  JWTKEY,
} = process.env

let config = {
  host: DBHOST,
  dbName: DBNAME,
  user: DBUSER,
  password: DBPASS,
  port: DBPORT,
  systemDefault: SYSTEMDEFAULT,
}
const todayDate = new Date().toISOString().slice(0, 10)
module.exports = {
  express: require('./express'),
  sequelize: require('./sequelize')(config),
  encrypt: require('./encrypt'),
  jwt: require('./jwt')(JWTKEY),
  port: APPPORT,
  todayDate,
}
