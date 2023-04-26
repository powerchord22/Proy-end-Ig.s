import pool from "../db.js";

export const allPacientes = async (req, res, next) => {
      try {
        const allPacientes = await pool.query("SELECT * FROM pacientes");
        res.json(allPacientes.rows);
        // console.table(allPacientes.rows);
        res.send("devolviendo lista de pacientes");
      } catch (error) {
        console.log(error.message);
    
    }
};

export const getPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Id paciente no encontrado",
      });
    }
    res.status(200).json(result.rows[0]);
    console.table(result.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Error al consultar la base de datos",
    });
  }
};

export const createPaciente = async (req, res, next) => {
      const { nombre, rut, direccion, asesoria, fecha } = req.body;
        try {
            const result = await pool.query(
            "INSERT INTO pacientes (nombre, rut, direccion, asesoria,fecha) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [nombre, rut, direccion, asesoria, fecha]
          );
          res.status(201).json(result.rows[0])
          console.table(result.rows)
          // res.json({ message: 'Paciente guardado satisfactoriamente' });
        } catch (error) {;
          console.error(error.message);
          res.status(500).send(error.message)
        }
};
      

export const deletePaciente = async (req, res, next) => {
        try {
          const { id } = req.params;
          const result = await pool.query(
            "DELETE FROM pacientes WHERE id = $1 RETURNING *",
            [id]
          );
      
          if (result.rowCount === 0) {
            return res.status(404).json({
              message: "Paciente no encontrado",
            });
          }
      
          res.status(200).json({
            message: "Paciente eliminado satisfactoriamente",
          });
        } catch (error) {
          next(error);
        }
};
      

export const updatePaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, rut, direccion, asesoria, fecha } = req.body;
    const result = await pool.query(
      "UPDATE pacientes SET nombre=$1, rut=$2, direccion=$3, asesoria=$4, fecha=$5 WHERE id=$6",
      [nombre, rut , direccion, asesoria, fecha, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Id paciente no encontrado",
      });
    }
    res.status(200).json({
      message: "Paciente actualizado satisfactoriamente",
      paciente: {
        id,
        nombre,
        rut,
        direccion,
        asesoria,
        fecha,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Error al actualizar el paciente",
    });
  }
};

// ________RUTAS LOGIN_________
      
export const registerUsuario = async (req, res, next) => {
  const { usuario, name, pass } = req.body;
    try {
        const result = await pool.query(
        "INSERT INTO usuarios (usuario, name, pass) VALUES ($1,$2,$3) RETURNING *",
        [usuario, name, pass]
      );
      res.status(201).json(result.rows[0])
      console.table(result.rows)
      // res.json({ message: 'Usuario guardado satisfactoriamente' });
    } catch (error) {;
      console.error(error.message);
      res.status(500).send(error.message)
    }
};


export const loginUsuario = async (req, res, next) => {
    const { usuario, pass } = req.body;
    try {
      const { rows } = await pool.query(
        'SELECT * FROM usuarios WHERE usuario = $1 AND pass = $2',
        [usuario, pass],
      );
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
      }
  
      const user = rows[0];
  
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
};
  
    
export default {
      allPacientes,
      getPaciente,
      createPaciente,
      deletePaciente,
      updatePaciente,
};
