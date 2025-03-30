const express = require("express");
const router = express.Router();
const {
  CreateMorador,
  viewMorador,
  UpdateMoradores,
  DeleteMoradores,
} = require("../controllers/MoradoresControllers");

router.get("/perfil/lista", viewMorador);
router.post("/perfil/cadastro", CreateMorador);

router.put("/perfil/:idMoradores/update", UpdateMoradores);
router.delete("/perfil/:idMoradores/delete", DeleteMoradores);

module.exports = router;
