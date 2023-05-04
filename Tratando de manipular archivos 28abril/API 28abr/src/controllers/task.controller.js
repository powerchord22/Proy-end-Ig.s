import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const allPacientes = async (req, res, next) => {
//       try {
//         const allPacientes = await pool.query("SELECT * FROM pacientes ORDER BY id DESC");
//         res.json(allPacientes.rows);
//         // console.table(allPacientes.rows);
//         res.send("devolviendo lista de pacientes");
//       } catch (error) {
//             console.log(error.message);

//       }
// };

// export const allPacientes = async (req, res, next) => {
//   try {
//     const pacientes = await pool.query("SELECT * FROM pacientes ORDER BY id DESC");
//     res.json(pacientes.rows);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Ha ocurrido un error al obtener la lista de pacientes." });
//   }
// };

//________________Consulta all paciente realizado,  ocupando CLASS_________________________________________



//creacion de cosntructor y order by
class Paciente {
  constructor(id, nombre, rut, direccion, asesoria, fecha) {
    this.id = id;
    this.nombre = nombre;
    this.rut = rut;
    this.direccion = direccion;
    this.asesoria = asesoria;
    this.fecha = fecha;
  }
}
export const allPacientes = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id, nombre, rut, direccion, asesoria, fecha FROM pacientes ORDER BY id DESC");
    const pacientes = result.rows.map(
      (row) =>
        new Paciente(
          row.id,
          row.nombre,
          row.rut,
          row.direccion,
          row.asesoria,
          row.fecha
        )
    );
    res.json(pacientes);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        error: "Ha ocurrido un error al obtener la lista de pacientes.",
      });
  }
};

//______________________________________________________________
export const allProfesionales = async (req, res, next) => {
  try {
    const allProfesionales = await pool.query("SELECT id, nombre, especialidad, telefono FROM profesional");
    res.json(allProfesionales.rows);
    // console.table(allPacientes.rows);
    res.send("devolviendo lista de profesionales");
  } catch (error) {
    console.log(error.message);
  }
};
export const table = async (req, res, next) => {
  try {
    const table= await pool.query("SELECT pacientes.rut, pacientes.nombre, profesionales.especialidad FROM pacientes INNER JOIN profesionales ON pacientes.id_profesional = profesionales.id");
    res.json(table.rows);
    // console.table(allPacientes.rows);
    res.send("devolviendo inner join prof/pac");
  } catch (error) {
    console.log(error.message);
  }
};


export const allProfGroupBy = async (req, res, next) => {
  try {
    const allProfesionales = await pool.query(
      "SELECT especialidad, COUNT(*) as count FROM profesional GROUP BY especialidad"
    );
    res.json(allProfesionales.rows);
    res.send("devolviendo lista de profesionales agrupados por especialidad");
  } catch (error) {
    console.log(error.message);
  }
};


// Obtiene un paciente por id
export const getPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT id, nombre, rut, direccion, asesoria, fecha FROM pacientes WHERE id = $1", [
      id,
    ]);
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

//Obtiene todos los datos tabla paciente para realizar metodo updata y llenar formulario por ID
// export const createPaciente = async (req, res, next) => {
//   const { nombre, rut, direccion, asesoria, fecha } = req.body;
//   console.log(req.body);
//   try {
//     const result = await pool.query(
//       "INSERT INTO pacientes (nombre, rut, direccion, asesoria,fecha) VALUES ($1,$2,$3,$4,$5) RETURNING *",
//       [nombre, rut, direccion, asesoria, fecha]
//     );
//     res.status(201).json(result.rows[0]);
//     console.table(result.rows);
//     // res.json({ message: 'Paciente guardado satisfactoriamente' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(error.message);
//   }
// };

export const createPaciente = async (req, res, next) => {
  const { nombre, rut, direccion, asesoria, fecha } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO pacientes (nombre, rut, direccion, asesoria,fecha) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [nombre, rut, direccion, asesoria, fecha]
    );
    req.flash('success', '¡Paciente guardado satisfactoriamente!');
    res.status(201).json(result.rows[0]);
    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};


// agrega una verificación de token a los métodos que necesite autenticación.
// Por ejemplo, se puede agregar la siguiente función como un middleware para proteger
//  el método createPaciente:

export const requireAuth = (req, res, next) => {
  //operador de encadenamiento verifica si esta el dato en authorization y a traves del metodo split accede al dato 1 del array
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación" });
  }

  try {
    const payload = jwt.verify(token, "mi-secreto");
    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no válido" });
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
      [nombre, rut, direccion, asesoria, fecha, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Id paciente no encontrado",
      });
    }
    res.status(200).send();
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
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(pass, salt);
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (usuario, name, pass) VALUES ($1,$2,$3) RETURNING *",
      [usuario, name, hashedPass]
    );
    res.status(201).json(result.rows[0]);
    console.table(result.rows);
    // res.json({ message: 'Usuario guardado satisfactoriamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

export const loginUsuario = async (req, res, next) => {
  const { usuario, pass } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(pass, user.pass);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, "mi-secreto");
    res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

export const logoutUsuario = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};

export default {
  allPacientes,
  getPaciente,
  createPaciente,
  deletePaciente,
  updatePaciente,
};
