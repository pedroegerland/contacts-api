const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/mysqlConfig.json')

class Mysql {
  async init() {
    return new Sequelize(process.env.DB_MYSQL_SCHEMA || 'mysql',
      process.env.DB_MYSQL_USER || db.USER,
      process.env.DB_MYSQL_PASSWORD || db.PASSWORD,
      {
        host: process.env.DB_MYSQL_HOST || db.HOST,
        port: process.env.DB_MYSQL_PORT || db.PORT,
        dialect: db.dialect,
        dialectOptions: {
          ssl: process.env.DB_MYSQL_SSL == "true"
        }
      })
  }

  async create() {
    const sql = await this.init()
    const Contacts = sql.define('contacts', {
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      cellphone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    })

    return { sql, Contacts }
  }
}

module.exports = new Mysql