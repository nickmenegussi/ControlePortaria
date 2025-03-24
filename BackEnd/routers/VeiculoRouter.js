const express = require('express')
const router = express.Router()
const {ViewVeiculos, CreateVeiculos} = require('../controllers/VeiculosControllers')

router.get('/veiculos', ViewVeiculos)
router.put('/veiculos/:idVeiculos',)

router.post('/veiculos/create', CreateVeiculos)
router.delete('/veiculos/:idVeiculos',)

module.exports = router