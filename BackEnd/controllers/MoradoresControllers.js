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
            message: 'Sucesso ao exibir os Moradores.',
            success: true,
            data: result
        })
    })
}

exports.CreateMorador = (req, res) => {
    const {nome, telefone, email, status} = req.body

    if(!nome || !telefone || !email || !status){
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

    connection.query('SELECT * FROM Moradores where nome = ? and telefone = ? and email = and status = ?',[nome, telefone, email, status], (err, result) => {
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
            connection.query('INSERT INTO Moradores(nome, telefone, email, status) values(?, ?, ?, ?)', [nome, telefone, email, status], (err, result) => {
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
        
}

exports.UpdateMoradores = (req, res) => {
    const {idMoradores} = req.params
    const {nome, telefone, email, status} = req.body

    if(!nome || !telefone || !email || !status || !idMoradores){
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

    connection.query('SELECT * FROM Moradores where idMoradores = ?', [idMoradores], (err, result) => {
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
        connection.query('UPDATE Moradores set nome = ?, telefone = ?, email = ?, status = ?',[nome, telefone,  email, status], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }
    
            return res.status(200).json({
                message: 'Morador atualizado com sucesso.',
                success: true,
                data: result
            })  
        })
    })
}

exports.DeleteMoradores = (req, res) => {
    const {idMoradores} = req.params

    if(!idMoradores){
        return res.status(400).json({
            message: 'Informe o id do Morador.',
            success: false
        })
    }

    connection.query('SELECT * FROM Moradores where idMoradores = ?', [idMoradores], (err, result) => {
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

        connection.query('DELETE FROM Moradores where idMoradores = ?', [idMoradores], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }
    
            return res.status(200).json({
                message: 'Morador deletado com sucesso.',
                success: true,
                data: result
            })  
        })
    })
}