// include lib datatype using sequelize
const { DataTypes } = require('sequelize')
const slug = require('slug')
// include base modul config database with sequelize
const { sequelize } = require('../index')

module.exports = sequelize.define(
  'informasi',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    konten: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: null,
    },
    dataJson: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: null,
      set(value) {
        this.setDataValue('dataJson', JSON.stringify(value))
      },
      get() {
        const dt = this.getDataValue('dataJson')
        return JSON.parse(dt)
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('slug', slug(this.judul))
      },
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
        fields: ['slug', 'judul'],
      },
    ],
  }
)
