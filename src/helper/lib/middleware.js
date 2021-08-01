const {
  jwt: { verifyToken },
} = require('../../state')

const authGuard = (req, res, next) => {
  if (
    req.headers.authorization == undefined ||
    req.headers.authorization == null
  ) {
    return res.status(403).send({
      status: 'failed',
      message: 'Headers authorization not found',
    })
  }

  return verifyToken(req.headers.authorization, function (err, payload) {
    if (err) {
      return res.status(403).send({
        status: 'failed',
        message: 'Expired token',
      })
    } else {
      req.user = payload
      next()
    }
  })
}

module.exports = {
  authGuard,
}
