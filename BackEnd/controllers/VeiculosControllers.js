const connection = require('../config/db')

exports.ViewVeiculos = (req, res) => {
    connection.query(` SELECT m.Moradores_id, m.placa, m.status, v.box, v.placa, v.modelo FROM Moradores as m
    JOIN Veiculos v on v.Moradores_id =  m.Moradores_id
    `, (err, result) => {
        if(err){
            return res.status(500).json({message: 'Erro ao se conectar com o servidor', success: false, data: err})
        }

        return res.status(200).json({message: 'Veiculos encontrados com sucesso', success: true, data: result})
    })
}

exports.CreateVeiculos = (req, res) => {
    const {placa, modelo, cor, Moradores_id} = req.body

    if(!placa || !modelo || !cor || !Moradores_id){
        return res.status(400).json({
            message: 'Preencha todos os dados.',
            success: false
        })
    }

    connection.query(`SELECT box, Moradores_id FROM Veiculos as v
    JOIN Moradores m on v.Moradores_id
    where m.Moradores_id = v.Moradores_id
    and Moradores_id = ?`, [Moradores_id], (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Veículo não encontrado.',
                data: false
            })
        }

        if(result.length > 0){
            return res.status(400).json({
                message: 'Esse veículo já possui uma box e já tem um Morador. Portanto, não é possível cadastrar.',
                success: false
            })
        }
        

        connection.query('INSERT INTO VEICULOS(placa, modelo, cor, Moradores_id) VALUES(?, ?, ?, ?) ', [placa, modelo, cor, Moradores_id], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }

            return res.status(200).json({
                message: 'Veículo criador com sucesso.',
                success: true,
                data: result
            })
        })
    })
}

exports.UpdateVeiculos = (req, res) => {
    const {idVeiculos} = req.params
    const {placa, modelo, cor} = req.body

    if(!placa || !modelo || !cor || !idVeiculos){
        return res.status(400).json({
            messasge: 'Preencha todos os campos.',
            success: false
        })
    }


    connection.query('SELECT * FROM Veiculos where idVeiculos = ?', [idVeiculos], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Veiculos não existe.',
                success: false
            })
        }
        connection.query('UPDATE Veiculos set placa = ?, modelo = ?, cor = ? where idVeiculos = ?',[placa, modelo,  cor], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }
    
            return res.status(200).json({
                message: 'Veiculo atualizado com sucesso.',
                success: true,
                data: result
            })  
        })
    })
}

exports.DeleteVeiculos = (req, res) => {
    const {idVeiculos} = req.params

    if(!idVeiculos){
        return res.status(400).json({
            message: 'Preencha todos os dados.',
            success: false
        })
    }

    connection.query('SELECT * FROM Veiculos where idVeiculos = ?', [idVeiculos], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Veículo não encontrado.',
                data: false
            })
        }

        connection.query('DELETE FROM Veiculos where idVeiculos = ?', [idVeiculos], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }

            return res.status(200).json({
                message: 'Veiculo deletado com sucesso',
                success: true,
                data: result
            })
        })
    })
}