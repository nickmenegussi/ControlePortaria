const express = require('express')
const router = express.Router()
const {CreateMorador, viewMorador} = require('../controllers/MoradoresControllers')

router.get('/morador', viewMorador)
router.post('/morador/create', CreateMorador)

module.exports = router