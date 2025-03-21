const connection = require('../config/db')

exports.viewMorador = (req, res) => {
    connection.query('SELECT * FROM Moradores', (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os Moradores.'
        })
    })
}

exports.CreateMorador = (req, res) => {
    const {nome, bloco, apartamento, telefone, email, status} = req.body

    if(!nome || !bloco || !apartamento || !telefone || !email || !status){
        return res.status(400).json({
            messasge: 'Preencha todos os campos.',
            success: false
        })
    }

    if (status !== 'residente' && status !== 'proprietario' && status !== 'visitante'){
        return res.status(400).json({
            message: 'Selecione um valor válido do nosso menu.',
            success: false
        })
    }

    connection.query('SELECT * FROM Moradores where nome = ? and bloco = ? and apartamento = ? and telefone = ? and email = ',[nome, bloco, apartamento, telefone, email], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        if(result.length > 0){
            return res.status(400).json({
                message: 'Usuário já cadastrado',
                success: false
            })
        }

        connection.query(`SELECT * FROM Moradores where status = 'residente'`, [status], (err,result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }
            if(result.length > 0){
                return res.status(422).json({
                    message: 'Este condominio já possui 1 propietario.'
                })
            }

            connection.query('INSERT INTO Moradores(nome, bloco, apartamento, telefone, email, status) values(?, ?, ?, ?, ?, ?)', [nome, bloco, apartamento, telefone, email, status], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: 'Erro ao se conectar com o servidor',
                        success: false,
                        data: err
                    })
                }
    
                return res.status(200).json({
                    message: 'Morador criador com sucesso.',
                    success: true,
                    data: result
                })
            })
        })
        
    })
}

exports.UpdateMoradores = (req, res) => {
    const {idVeiculos} = req.params
    const {nome, bloco, apartamento, telefone, email, status} = req.body

    if(!nome || !bloco || !apartamento || !telefone || !email || !status || !idVeiculos){
        return res.status(400).json({
            messasge: 'Preencha todos os campos.',
            success: false
        })
    }

    if(status !== 'residente' && status !== 'proprietario' && status !== 'visitante'){
        return res.status(400).json({
            message: 'Selecione um valor válido do nosso menu.',
            success: false
        })
    }

    connection.query('SELECT * FROM Moradores where idMoradores = ?', [idVeiculos], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Morador não existe.',
                success: false
            })
        }
        connection.query('UPDATE Moradores set nome = ?, bloco = ?, apartamento = ?, telefone = ?, email = ?, status = ?',[nome, bloco, apartamento, telefone,  email, status ])
    })
}