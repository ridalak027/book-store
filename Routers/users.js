const express = require('express')
const userController = require('../Controlles/user')  //import controller functions 

const router = express.Router()

router.post('/api/register' , userController.register)
router.post('/api/login' , userController.login)
router.get('/api/users' , userController.Alluser)


module.exports = router