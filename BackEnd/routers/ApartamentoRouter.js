const express = require("express");
const router = express.Router();
const {
  CreateApartamento,
  ViewApartamento,
  UpdateApartamento,
  DeleteApartamento,
} = require("../controllers/ApartamentoControllers");

router.get("/apartamento/lista", ViewApartamento);
router.post("/apartamento/cadastro", CreateApartamento);

router.put("/apartamento/:idApartamento/update", UpdateApartamento);
router.delete("/apartamento/:idApartamento/delete", DeleteApartamento);

module.exports = router;
