const express = require('express')
const router = express.Router()
const {CreateMorador, viewMorador, UpdateMoradores ,DeleteMoradores} = require('../controllers/MoradoresControllers')

router.get('/morador', viewMorador)
router.post('/morador/create', CreateMorador)

router.put('/morador/:idMorador/update', UpdateMoradores)
router.delete('/morador/:idMorador/delete', DeleteMoradores)

module.exports = router