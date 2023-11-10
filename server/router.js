let express = require('express')
let router = express.Router()
let login = require('./API/login')

router.get('/login', login.login)
router.post('/register', login.register)

//router.post('/register/personal', login.register)

module.exports = router
