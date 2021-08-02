const { express, sequelize, port } = require('./state')
const http = require('./helper/http')
function run() {
  sequelize.sync({ force: false, alter: false })
  http()
  express.listen(process.env.PORT || 8080, () => console.log('server running on port ' + port))
}

run()
