import { Router } from "express";
import {
  allPacientes,
  getPaciente,
  createPaciente,
  deletePaciente,
  updatePaciente,
  registerUsuario,
  loginUsuario,
} from "../controllers/task.controller.js";

const router = Router();
// _______rutas pacientes_______
router.get("/api/v1/pacientes", allPacientes); 

router.get("/api/v1/pacientes/:id", getPaciente);

router.post("/api/v1/pacientes", createPaciente);

router.put("/api/v1/pacientes/:id", updatePaciente);

router.delete("/api/v1/pacientes/:id", deletePaciente);

// _______rutas Usuarios_______

router.post("/api/v1/register", registerUsuario)

router.post("/api/v1/login", loginUsuario)


export default router;
