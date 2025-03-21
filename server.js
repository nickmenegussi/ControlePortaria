const express = require('express')
const cors = require('cors')
const port = 3001
const morador = require('./routers/MoradorRouter')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/morador', morador)
app.listen(port, () => console.log(`Rodando na porta ${port}`))