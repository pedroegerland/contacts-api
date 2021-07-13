const bcrypt = require('bcrypt')
const randomWords = require('random-words')
const redis = require('./redis')
const jwt = require('jsonwebtoken')

class Auth {
  async encrypt(identifier) {
    const saltRounds = 10
    const pass = identifier
    const randomPass = randomWords({ exactly: 2, join: '-' })
    const newPassword = `${pass}${randomPass}`

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(newPassword, salt)

    return { pass, hash }
  }

  async login(identifier) {
    const { pass, hash } = await this.encrypt(identifier)
    const token = await this.genToken(identifier, pass, hash)

    return token
  }

  async genToken(identifier, pass, hash) {
    console.log('info', {
      identifier,
      pass,
      hash,
    })
    const redisToken = redis.get('jwt-mcp')
    const firstFour = identifier.substring(0, 4)

    if (firstFour === 'w1tP') {
      console.log('match firstFour')
      if (redisToken) redis.del('jwt-mcp')

      const token = jwt.sign({
        data: hash
      }, pass, { expiresIn: '1h' })

      console.log('tokenfirstFour', token)

      redis.set('jwt-mcp', `${token}`, 3600)

      return { token }
    }
    if (redisToken) redis.del('jwt-vjo')

    const token = jwt.sign({
      data: hash
    }, pass, { expiresIn: '1h' })

    console.log('token', token)

    redis.set('jwt-vjo', `${token}`, 3600)
    return { token }
  }
}

module.exports = new Auth