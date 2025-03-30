const express = require('express')
const cors = require('cors')
const port = 3001
const morador = require('./routers/MoradorRouter')
const apartamento = require('./routers/ApartamentoRouter')
const veiculo = require('./routers/VeiculoRouter')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/morador', morador)
app.use('/apartamento', apartamento)
app.use('/veiculos', veiculo)
app.listen(port, () => console.log(`Rodando na porta ${port}`))