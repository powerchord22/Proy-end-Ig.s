//ruta principal
const rutaIndex = async function(req, res) {
  res.render("index");
};

// ruta info mostrar datatable
const rutaInfo = async function(req, res) {
  res.render("info");
};

// ver todos los pacientes
const allPacientes = async function(req, res) {
  res.render("pacientes");
};

//crear un paciente
const crearPacientes = async function(req, res) {
  res.render("create");
};

// actualizar paciente
const updatePaciente = async function(req, res) {

};

// borrar paciente
const deletePaciente = async function(req, res) {

};

// login paciente
const logIn = async function(req, res) {

};

// logout paciente
const logOut = async function(req, res) {

};

module.exports = {
  rutaIndex: rutaIndex,
  rutaInfo: rutaInfo,
  allPacientes: allPacientes,
  crearPacientes: crearPacientes,
  updatePaciente: updatePaciente,
  deletePaciente: deletePaciente,
  logIn: logIn,
  logOut: logOut
};

