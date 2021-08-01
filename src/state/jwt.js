const { verify, sign } = require('jsonwebtoken')

module.exports = (jwtKey) => {
  return {
    createToken: (payload) => {
      return sign(payload, jwtKey, { expiresIn: '1d' })
    },
    verifyToken: (token, callback) => {
      return verify(token, jwtKey, callback)
    },
  }
}
