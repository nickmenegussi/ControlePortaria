const connection = require("../config/db");

exports.ViewVeiculos = (req, res) => {
  connection.query(
    ` SELECT v.idVeiculos, m.nome, m.status, v.modelo, v.placa, v.cor, v.Box FROM Moradores as m
    JOIN Veiculos v on v.Moradores_id =  m.idMoradores
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor",
          success: false,
          data: err,
        });
      }

      return res.status(200).json({
        message: "Veiculos encontrados com sucesso",
        success: true,
        data: result,
      });
    }
  );
};

exports.CreateVeiculos = (req, res) => {
  const { placa, modelo, cor, Box, Moradores_id } = req.body;

  if (!placa || !modelo || !cor || !Box || !Moradores_id) {
    return res.status(400).json({
      message: "Preencha todos os dados.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM Veiculos WHERE Moradores_id = ?`,
    [Moradores_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor",
          success: false,
          data: err,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message:
            "Esse veículo já possui uma box e já tem um Morador. Portanto, não é possível cadastrá-lo.",
          success: false,
        });
      }

      connection.query(
        "INSERT INTO VEICULOS(placa, modelo, cor, Box, Moradores_id) VALUES(?, ?, ?, ?, ?) ",
        [placa, modelo, cor, Box, Moradores_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor",
              success: false,
              data: err,
            });
          }

          return res.status(200).json({
            message: "Veículo criador com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.UpdateVeiculos = (req, res) => {
  const { idVeiculos } = req.params;
  const { placa, modelo, cor, Box, Moradores_id } = req.body;

  if (!placa || !modelo || !cor || !Box || !Moradores_id) {
    return res.status(400).json({
      messasge: "Preencha todos os campos.",
      success: false,
    });
  }

  connection.query(
    "SELECT * FROM Veiculos where idVeiculos = ?",
    [idVeiculos],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "Veiculo não existe.",
          success: false,
        });
      }
      connection.query(
        "UPDATE Veiculos set placa = ?, modelo = ?, cor = ?, Box = ?, Moradores_id = ? where idVeiculos = ?",
        [placa, modelo, cor, Box, Moradores_id, idVeiculos],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor",
              success: false,
              data: err,
            });
          }

          return res.status(200).json({
            message: "Veículo atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.DeleteVeiculos = (req, res) => {
  const { idVeiculos } = req.params;

  if (!idVeiculos) {
    return res.status(400).json({
      message: "Preencha todos os dados.",
      success: false,
    });
  }

  connection.query(
    "SELECT * FROM Veiculos where idVeiculos = ?",
    [idVeiculos],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "Veículo não encontrado.",
          data: false,
        });
      }

      connection.query(
        "DELETE FROM Veiculos where idVeiculos = ?",
        [idVeiculos],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor",
              success: false,
              data: err,
            });
          }

          return res.status(200).json({
            message: "Veiculo deletado com sucesso",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};
