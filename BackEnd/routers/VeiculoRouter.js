const express = require("express");
const router = express.Router();
const {
  ViewVeiculos,
  CreateVeiculos,
  UpdateVeiculos,
  DeleteVeiculos,
} = require("../controllers/VeiculosControllers");

router.get("/veiculos/lista", ViewVeiculos);
router.put("/veiculos/:idVeiculos/update", UpdateVeiculos);

router.post("/veiculos/cadastro", CreateVeiculos);
router.delete("/veiculos/:idVeiculos/delete", DeleteVeiculos);

module.exports = router;
