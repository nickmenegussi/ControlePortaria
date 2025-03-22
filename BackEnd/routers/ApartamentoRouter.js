const express = require('express')
const router = express.Router()
const {CreateApartamento, ViewApartamento, UpdateApartamento ,DeleteApartamento} = require('../controllers/ApartamentoControllers')

router.get('/apartamento', ViewApartamento)
router.post('/apartamento/create', CreateApartamento)

router.put('/apartamento/:idApartamento/update', UpdateApartamento)
router.delete('/apartamento/:idApartamento/delete', DeleteApartamento)

module.exports = router