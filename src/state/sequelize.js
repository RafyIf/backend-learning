const { Sequelize } = require('sequelize')

module.exports = ({ host, dbName, user, password, port, systemDefault }) => {
  const database = new Sequelize(dbName, user, password, {
    host,
    dialect: systemDefault,
    port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  })
  return database
}
