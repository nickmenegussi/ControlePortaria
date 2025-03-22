const connection = require('../config/db')

exports.ViewApartamento = (req, res) => {
    connection.query(`
        SELECT m.idMoradores, m.nome as Morador,  m.status ,a.bloco as Bloco_Apartamento, a.numeroApartamento
        FROM Apartamento a
        JOIN Moradores m on a.idMorador = m.idMoradores
        where a.numeroApartamento in (
            SELECT a.numeroAPartamento
            FROM Apartamento a
            group by a.bloco, a.numeroApartamento
            HAVING COUNT(*) >= 2
        )
        `, (err, result) => {
        if(err){
            return res.status(500).json({message: 'Erro ao se conectar com o servidor', success: false, data: err})
        }

        return res.status(200).json({message: 'Apartamentos encontrados com sucesso', success: true, data: result})
    })
}

exports.CreateApartamento = (req, res) => {
    const {idMorador, numeroApartamento, bloco} = req.body

    if(!idMorador || !numeroApartamento || !bloco){
        return res.status(400).json({message: 'Preencha todos os campos', success: false})
    }

    connection.query(`SELECT * FROM Moradores where idMoradores = ?`, [idMorador], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message: 'Morador não encontrado. Cadastre um morador antes de cadastrar um apartamento.',
                    success: false
                })
            }
 
    connection.query(`SELECT * FROM Apartamento as a
                JOIN Moradores m on a.idMorador
                where m.idMoradores = a.idMorador
                and idMorador = ? 
                and m.status = 'proprietario'
               ;`, [idMorador], (err,result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor',
                    success: false,
                    data: err
                })
            }
            if(result.length > 0){
                return res.status(422).json({
                    message: 'Este condominio já possui 1 propietario. Portanto, não é possível que ele possua mais um apartamento.',
                    sucess: false
                })
            } 

            connection.query('SELECT * FROM Apartamento where idMorador = ?', [idMorador], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: 'Erro ao se conectar com o servidor',
                        success: false,
                        data: err
                    })
                }

                if(result.length > 0){
                    return res.status(422).json({
                        message: 'Este residente ou visitante já está em um apartamento. Portanto, ele já faz parte do apartamento, não é possível ter o mesmo residente na mesma unidade.',
                        success: false
                    })
                }
                connection.query('INSERT INTO Apartamento(numeroApartamento, bloco, idMorador) VALUES(?, ?, ?)', [numeroApartamento,bloco,idMorador], (error, results) => {
                    if(error){
                        return res.status(400).json({message: 'Erro ao cadastrar apartamento', success: false})
                    }

                    return res.status(201).json({message: 'Apartamento cadastrado com sucesso', success: true, data: results})
                })
            })
        })
    })
}

exports.UpdateApartamento = (req, res) => {
    const {idApartamento} = req.params
    const {numeroApartamento, bloco, idMorador} = req.body

    if(!numeroApartamento || !bloco || !idMorador || !idApartamento){
        return res.status(400).json({message: 'Preencha todos os campos', success: false})
    }

    connection.query('SELECT * FROM Apartamento where idApartamento = ?', [idApartamento], (err, result) => {
        if(err){
            return res.status(500).json({message: 'Erro ao se conectar com o servidor', success: false, data: err})
        }

        if(result.length === 0){
            return res.status(404).json({message: 'Apartamento não encontrado', success: false})
        }

        connection.query('UPDATE Apartamento SET numeroApartamento = ?, bloco = ?, idMorador = ? WHERE idApartamento = ?', [numeroApartamento, bloco, idMorador, idApartamento], (error, results) => {
            if(error){
                return res.status(400).json({message: 'Erro ao atualizar apartamento', success: false})
            }

            return res.status(200).json({message: 'Apartamento atualizado com sucesso', success: true, data: results})
        })
    })
}

exports.DeleteApartamento = (req, res) => {
    const {idApartamento} = req.params

    if(!idApartamento){
        return res.status(400).json({
            message: 'Informe o id do apartamento', 
            success: false
        })
    }

    connection.query('SELECT * FROM Apartamento where idApartamento = ?', [idApartamento], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor', 
                success: false, data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: 'Apartamento não encontrado', 
                success: false
            })
        }

        connection.query('DELETE FROM Apartamento WHERE idApartamento = ?', [idApartamento], (error, results) => {
            if(error){
                return res.status(400).json({
                    message: 'Erro ao deletar apartamento', 
                    success: false
                })
            }

            return res.status(200).json({
                message: 'Apartamento deletado com sucesso', 
                success: true, data: results
            })
        })
    })
}