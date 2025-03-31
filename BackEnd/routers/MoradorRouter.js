const express = require("express");
const router = express.Router();
const {
  CreateMorador,
  viewMorador,
  UpdateMoradores,
  DeleteMoradores,
} = require("../controllers/MoradoresControllers");

router.get("/morador/lista", viewMorador);
router.post("/morador/cadastro", CreateMorador);

router.put("/morador/:idMoradores/update", UpdateMoradores);
router.delete("/morador/:idMoradores/delete", DeleteMoradores);

module.exports = router;
