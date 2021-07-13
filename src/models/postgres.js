const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/postgresConfig.json')

class Postgres {
  async init() {
    return new Sequelize(process.env.DB_POSTGRES_SCHEMA || db.dialect,
      process.env.DB_POSTGRES_USER || db.USER,
      process.env.DB_POSTGRES_PASSWORD || db.PASSWORD,
      {
        host: process.env.DB_POSTGRES_HOST || db.HOST,
        port: process.env.DB_POSTGRESPORT || db.PORT,
        dialect: db.dialect,
        dialectOptions: {
          ssl: process.env.DB_POSTGRES_SSL == "true"
        }
      }
    )
  }

  async create() {
    const post = await this.init()
    const Contacts = post.define(db.DB, {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cellphone: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
    })
    return { post, Contacts }
  }
}

module.exports = new Postgres