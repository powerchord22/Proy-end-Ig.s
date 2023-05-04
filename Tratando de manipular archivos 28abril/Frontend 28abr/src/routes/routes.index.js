import express from "express";
const router = express.Router();
import { allProfesionales } from "../controllers/prof.controller.js";
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

// ruta para renderizar profesionales 
router.get("/create", allProfesionales);

// ruta info mostrar datatable
router.get("/info", allPacientes, allProfesionales);



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

//ruta para registrar nuevo usuario
router.post("/register", registerUsuario);

router.post("/login", loginUsuario)

// crear un paciente
router.post("/create", crearPacientes);

// editar vecino ( se coloca el action de el formulario)
router.post("/update", updatePaciente);

// borrar vecino
router.get("/delete/:id", deletePaciente);



export default router;
