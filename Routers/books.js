const express = require('express')
const bookController = require('../Controlles/book')
const authMiddleware = require('../Middlewares/auth.middleware')
const router = express.Router()

router.get('/api/books' ,bookController.getAllbooks)
router.get('/api/books/:id',bookController.getBook)
router.delete('/api/books/:id' ,authMiddleware ,bookController.delete)
router.put('/api/books/:id' ,authMiddleware ,bookController.updete)
router.post('/api/books' ,authMiddleware ,bookController.create)

module.exports = router