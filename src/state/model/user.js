// include lib datatype using sequelize
const { DataTypes } = require('sequelize')
// include base modul config database with sequelize
const {
  sequelize,
  encrypt: { hashPassword },
} = require('../index')

module.exports = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', hashPassword(value))
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    role: {
      type: DataTypes.ENUM(['admin', 'dosen', 'mahasiswa']),
      allowNull: false,
      defaultValue: 'mahasiswa',
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.lastName == null) {
          return this.firstName
        } else {
          return this.firstName + ' ' + this.lastName
        }
      },
    },
  },
  {
    freezeTableName: true,
  }
)
