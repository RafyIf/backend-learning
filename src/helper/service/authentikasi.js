const { user } = require('../../state/model')
const {
  encrypt: { verifyPassword },
  jwt: { createToken },
} = require('../../state')
module.exports = class {
  static register(body) {
    return user
      .create(body)
      .then((it) => {
        return {
          status: 'success',
          data: it,
        }
      })
      .catch((err) => {
        return {
          status: 'failed',
          message: err.message,
        }
      })
  }

  static login(body) {
    return user
      .findOne({
        where: {
          username: body.username,
        },
      })
      .then((item) => {
        if (item == null) {
          return {
            status: 'failed',
            message: 'invalid username',
          }
        }
        return verifyPassword(
          body.password,
          item.password,
          function (isMatch, message) {
            if (!isMatch) {
              return {
                status: 'failed',
                message,
              }
            }
            const accessToken = createToken({
              username: item.username,
              role: item.role,
              userId: item.id,
            })
            return {
              status: 'success',
              message: 'Username and ' + message,
              accessToken,
            }
          }
        )
      })
      .catch((err) => ({ status: 'failed', message: err.message }))
  }

  static findUser(payloadToken) {
    return user
      .findAll()
      .then((it) => {
        return {
          status: 'success',
          by: {
            username: payloadToken.username,
            role: payloadToken.role,
          },
          data: it,
        }
      })
      .catch((err) => ({ status: 'failed', message: err.message }))
  }
}
