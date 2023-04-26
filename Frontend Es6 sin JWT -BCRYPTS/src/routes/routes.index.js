import express from "express";
const router = express.Router();
import {
  allPacientes,
  crearPacientes,
  deletePaciente,
  getPaciente,
  logIn,
  logOut,
  loginUsuario,
  register,
  registerUsuario,
  rutaCreate,
  rutaIndex,
  updatePaciente,
  updateVecino,
} from "../controllers/user.controller.js";

// ruta principal
router.get("/", rutaIndex);

// ruta info mostrar datatable
router.get("/info", allPacientes);

//ruta para ver formulario nuevo vecino
router.get("/create" , rutaCreate)

//ruta para renderizar pagina  edit.ejs
router.get("/edit/:id", getPaciente)

// _________________________________________________
//ruta login usuario
router.get("/login", logIn)

//ruta para crear usuario
router.get("/register", register)
//=============================================================

router.post("/register", registerUsuario);

router.post("/login", loginUsuario)

// crear un paciente
router.post("/create", crearPacientes);

// editar vecino ( se coloca el action de el formulario)
router.post("/update", updatePaciente);

// borrar vecino
router.get("/delete/:id", deletePaciente);



export default router;
