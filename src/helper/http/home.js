const { express } = require('../../state')

module.exports = () => {
  express.get('/', (req, res) => {
    res.send('Hello Word')
  })

  express.get('/pageTwo', (req, res) => {
    res.send('Hello Word page two')
  })
}
