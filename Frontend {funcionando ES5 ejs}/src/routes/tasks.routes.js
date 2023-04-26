const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller.js");

const {
  rutaIndex,
  rutaInfo,
  allPacientes,
  crearPacientes,
  updatePaciente,
  deletePaciente,
  logIn,
  logOut,
} = taskController;

//ruta principal
router.get("/", rutaIndex);

// ruta info mostrar datatable
router.get("/info", rutaInfo);

//ver todos los pacientes
router.get("/create", allPacientes);

// crear un paciente
router.post("/create", crearPacientes);

// actualizar paciente
router.put("/edit/:id", updatePaciente);

// borrar paciente
router.delete("/delete/:id", deletePaciente);

// login paciente
router.post("/login", logIn);

// logout paciente
router.post("/logout", logOut);

module.exports = router;

// import { Router } from "express";
// import {
//   getAllTasks,
//   getTask,
//   deleteTask,
//   updateTask,
//   createTask,
// } from "../controllers/task.controller.js";

// const router = Router();

// router.get("/v1/tasks", getAllTasks);

// router.get("/v1/tasks/:id", getTask);

// router.post("/v1/tasks", createTask);

// router.delete("/v1/tasks/:id", deleteTask);

// router.put("/v1/tasks/:id", updateTask);

// export default router;
