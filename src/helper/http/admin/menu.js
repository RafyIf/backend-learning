const { express } = require('../../../state')
const { menu } = require('../../service')
const {
  middleware: { authGuard },
} = require('../../lib')
module.exports = () => {
  express.get('/api/menu/findAll', authGuard, (req, res) => {
    menu
      .findAll(req.user)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.get('/api/menu/findOne/:menuId', authGuard, (req, res) => {
    menu
      .findOne(req.user, req.params.menuId)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.get('/api/menu/findByParent/:menuId', authGuard, (req, res) => {
    menu
      .findByParent(req.user, req.params.menuId)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.post('/api/menu/create', authGuard, (req, res) => {
    menu
      .create(req.user, req.body)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.post('/api/menu/updateMany', authGuard, (req, res) => {
    menu
      .updateMany(req.user, req.body)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.patch('/api/menu/update/:menuId', authGuard, (req, res) => {
    menu
      .update(req.user, req.body, req.params.menuId)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
  express.delete('/api/menu/delete/:menuId', authGuard, (req, res) => {
    menu
      .delete(req.user, req.params.menuId)
      .then((item) => res.status(200).send(item))
      .catch((err) => res.status(403).send(err))
  })
}
