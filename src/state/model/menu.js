// include lib datatype using sequelize
const { DataTypes } = require('sequelize')
const slug = require('slug')

// include base modul config database with sequelize
const { sequelize, todayDate } = require('../index')

module.exports = sequelize.define(
  'menu',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaMenu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    imgKey: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM(['informasi', 'menu', 'link']),
      allowNull: true,
      defaultValue: 'menu',
    },
    subType: {
      type: DataTypes.ENUM(['sub1', 'sub2', 'sub3']),
      allowNull: true,
      defaultValue: 'sub1',
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value == null) {
          this.setDataValue('slug', slug(todayDate + ' ' + this.namaMenu))
        } else {
          this.setDataValue('slug', slug(value + ' ' + this.namaMenu))
        }
      },
    },
    keterangan: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: null,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['slug'],
      },
    ],
  }
)
