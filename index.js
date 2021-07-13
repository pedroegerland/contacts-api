const express = require('express')
const routes = require('./src/routes')
const postgres = require('./src/models/postgres')
const mysql = require('./src/models/mysql')

const app = express()
const port = 8005

routes(app)

async function testConnection() {
  let database = 'Postgres'
  try {

    const { post } = await postgres.create()
    const { sql } = await mysql.create()

    await post.authenticate()
    console.log('Connection has been established successfully with Postgres.')

    post.sync()

    database = 'Mysql'

    await sql.authenticate()
    console.log('Connection has been established successfully with Mysql.')

    sql.sync()
  } catch (err) {
    console.log(`Unable to connect to the ${database}: `, err)
  }

  app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))
}

testConnection()

module.exports = app


