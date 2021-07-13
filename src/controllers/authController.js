const auth = require('../middlewares/jwt')

class JwtController {
  login = async (req, res) => {  
      const { identifier } = req.body
      console.log('identifier', identifier)
    try {
      const jwt = await auth.login(identifier)
      return res.status(200).json(jwt)  
    } catch (err) {
      return res.status(500).json(err.message)
    }
  }
}

module.exports = new JwtController