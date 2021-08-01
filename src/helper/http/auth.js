const { authentikasi } = require('../service')
const { express } = require('../../state')
const {
  middleware: { authGuard },
} = require('../lib')
module.exports = () => {
  express.post('/api/register', (req, res) => {
    authentikasi
      .register(req.body)
      .then((it) => res.status(200).send(it))
      .catch((err) => res.status(403).send(err))
  })

  express.post('/api/login', (req, res) => {
    authentikasi
      .login(req.body)
      .then((it) => res.status(200).send(it))
      .catch((err) => res.status(403).send(err))
  })

  express.get('/api/users', authGuard, (req, res) => {
    authentikasi
      .findUser(req.user)
      .then((it) => res.status(200).send(it))
      .catch((err) => res.status(403).send(err))
  })
}
