const express = require('express')
const router = express.Router()
const {ViewVeiculos, CreateVeiculos, UpdateVeiculos, DeleteVeiculos} = require('../controllers/VeiculosControllers')

router.get('/veiculos', ViewVeiculos)
router.put('/veiculos/:idVeiculos', UpdateVeiculos)

router.post('/veiculos/create', CreateVeiculos)
router.delete('/veiculos/:idVeiculos', DeleteVeiculos)

module.exports = router