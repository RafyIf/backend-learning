const { menu } = require('../../state/model')
const {
  array: { nested },
} = require('../lib')
const { todayDate } = require('../../state')
module.exports = class {
  static findAll(payloadToken) {
    return new Promise((resolve, reject) => {
      menu
        .findAll()
        .then((result) => {
          const it = result.map((el) => el.get({ plain: true }))
          let data = nested(it)
          resolve({
            status: 'success',
            readBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data,
          })
        })
        .catch((err) => reject({ status: 'failed', message: err.message }))
    })
  }

  static findOne(payloadToken, menuId) {
    return new Promise((resolve, reject) => {
      menu
        .findOne({ where: { id: menuId } })
        .then((it) =>
          resolve({
            status: 'success',
            readBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data: it,
          })
        )
        .catch((err) => reject({ status: 'failed', message: err.message }))
    })
  }

  static findByParent(payloadToken, menuId) {
    return new Promise((resolve, reject) => {
      menu
        .findAll({ where: { parent: menuId } })
        .then((it) =>
          resolve({
            status: 'success',
            readBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data: it,
          })
        )
        .catch((err) => reject({ status: 'failed', message: err.message }))
    })
  }

  static create(payloadToken, body) {
    return new Promise((resolve, reject) => {
      if ('parent' in body && body.parent != null) {
        menu
          .findByPk(body.parent)
          .then((it) => {
            let name =
              it.namaMenu == body.namaMenu ? todayDate + '-sub' : it.namaMenu
            menu
              .create({
                ...body,
                ...{ slug: name, userId: payloadToken.userId },
              })
              .then((result) => {
                resolve({
                  status: 'success',
                  createBy: {
                    username: payloadToken.username,
                    role: payloadToken.role,
                  },
                  data: result,
                })
              })
              .catch((err) => {
                reject({
                  status: 'failed',
                  message: 'failed to create',
                })
              })
          })
          .catch((err) => {
            reject({
              status: 'failed',
              message: 'record parent not found',
            })
          })
      } else {
        menu
          .create({ ...body, ...{ slug: null, userId: payloadToken.userId } })
          .then((it) => {
            resolve({
              status: 'success',
              createBy: {
                username: payloadToken.username,
                role: payloadToken.role,
              },
              data: it,
            })
          })
          .catch((err) => {
            reject({
              status: 'failed',
              message: err.message,
            })
          })
      }
    })
  }

  static update(payloadToken, body, menuId) {
    return new Promise((resolve, reject) => {
      menu
        .update(
          { ...body, ...{ userId: payloadToken.userId } },
          { where: { id: menuId } }
        )
        .then((changed) => {
          resolve({
            status: 'success',
            updateBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data: changed + ' Rows updated',
          })
        })
        .catch((err) => {
          reject({
            status: 'failed',
            message: err.message,
          })
        })
    })
  }

  static updateMany(payloadToken, body) {
    let menuId = body.menuId
    delete body.menuId
    return new Promise((resolve, reject) => {
      menu
        .update(
          { ...body, ...{ userId: payloadToken.userId } },
          { where: { id: menuId } }
        )
        .then((changed) => {
          resolve({
            status: 'success',
            updateBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data: changed + ' Rows updated',
          })
        })
        .catch((err) => {
          reject({
            status: 'failed',
            message: err.message,
          })
        })
    })
  }

  static delete(payloadToken, menuId) {
    return new Promise((resolve, reject) => {
      menu
        .destroy({ where: { id: menuId } })
        .then((changed) => {
          resolve({
            status: 'success',
            deleteBy: {
              username: payloadToken.username,
              role: payloadToken.role,
            },
            data: changed + ' Rows removed',
          })
        })
        .catch((err) => {
          reject({
            status: 'failed',
            message: err.message,
          })
        })
    })
  }
}
