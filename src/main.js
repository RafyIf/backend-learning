const { express, sequelize, port } = require('./state')
const http = require('./helper/http')
function run() {
  sequelize.sync({ force: false, alter: true })
  http()
  express.listen(port, () => console.log('server running on port ' + port))
}

run()
