const express = require('express')
const contacts = require('./contacts')
const access = require('./access')

module.exports = app => {
    app.use(
      express.json(),
      contacts,
      access,
    )
  }