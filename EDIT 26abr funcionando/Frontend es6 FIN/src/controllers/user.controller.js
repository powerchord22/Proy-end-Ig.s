import Swal from "sweetalert2";
//ruta principal
export const rutaIndex = async (req, res) => {
  res.render("index");
};

//renderiza ruta create ejs
export const rutaCreate = async (req, res) => {
  res.render("create");
};
// renderiza ruta login
export const logIn = async (req, res) => {
  res.render("login")
}

// renderiza ruta register
export const register = async (req, res) => {
  res.render("register")

};
// renderiza ruta para editar vecino
export const updateVecino = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await fetch(`http://localhost:3300/api/v1/pacientes/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
       },
    }); console.log(response)

    if (response.status !== 200) {
      
      const error = await response.json();
      console.error("error al obtener todos los pacientes", error);
      res.status(500).send("Error al obtener todos los pacientes");
    } else {
      const pacientes = await response.json();
      // console.log("Pacientes obtenidos", pacientes);
      res.render("edit", { pacientes });
    }
  } catch (error) {
    console.error("Error al obtener todos los pacientes", error);
    res.status(500).send("Error al obtener todos los pacientes")
  } 

};

// Crear un paciente
export const crearPacientes = async (req, res) => {
  const {nombre, rut, direccion,asesoria, fecha} = req.body
  try {
    const response = await fetch("http://localhost:3300/api/v1/pacientes/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
       },
       body: JSON.stringify ({ nombre, rut, direccion,asesoria, fecha, })
       
    });
    if (response.status !== 201) {
      const error = await response.text();
      console.error("error al crear un nuevo paciente", error);
      res.status(500).send("Error al crear un nuevo paciente");
    } else {
      const paciente = await response.json();
      console.log("Paciente creado", paciente);
      res.redirect("/info");
    }
    
  } catch (error) {
    console.error("Error al crear un nuevo paciente", error);
    res.status(500).send("Error al crear un nuevo paciente")
  }
};

// Ver todos los pacientes
export const allPacientes = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3300/api/v1/pacientes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
       },
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.error("error al obtener todos los pacientes", error);
      res.status(500).send("Error al obtener todos los pacientes");
    } else {
      const pacientes = await response.json();
      // console.log("Pacientes obtenidos", pacientes);
      res.render("info", { pacientes });
    }
  } catch (error) {
    console.error("Error al obtener todos los pacientes", error);
    res.status(500).send("Error al obtener todos los pacientes")
  }
};

// Ver solo un paciente
export const getPaciente = async (req, res) => {
  {
    try {
      const { id } = req.params;
      const response = await fetch(`http://localhost:3300/api/v1/pacientes/${id}`);
      const paciente = await response.json();
      res.render("edit", { paciente });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error al obtener los datos del paciente");
    }
  };
  
}

// registra un nuevo paciente en la ruta login
export const registerUsuario = async (req, res) => {
  const {usuario, name, pass} = req.body
  try {
    const response = await fetch("http://localhost:3300/api/v1/register/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
       },
       body: JSON.stringify({ usuario, name, pass })
       
    });
    if (response.status !== 201) {
      const error = await response.json();
      console.error("error al crear un nuevo registro", error);
      res.status(500).send("Error al crear un nuevo registro");
    } else {
      const registro = await response.json();
      console.log("registro creado", registro);
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al crear un nuevo registro", error);
    res.status(500).send("Error al crear un nuevo registro")
  }
};

 //actualiza un nuevo paciente en la ruta edit
export const updatePaciente = async (req, res) => {
  const { id, nombre, rut, direccion, asesoria, fecha} = req.body
  console.table(req.body)
  try {
    const response = await fetch(`http://localhost:3300/api/v1/pacientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
       },
       body: JSON.stringify({nombre, rut, direccion, asesoria, fecha})
    });
    if (response.status === 200) {
      console.log("Paciente actualizado");
      res.redirect("/info");
    } else if (response.status === 404) {
      console.error("error al actualizar el paciente");
      res.status(404).send("Error al actualizar el paciente");
    } else {
      console.error("error al actualizar el paciente");
      res.status(500).send("Error al actualizar el paciente");
    }
  } catch (error) {
    console.error("Error al actualizar el paciente", error);
    res.status(500).send("Error al actualizar el paciente")
  }
};

//Elimina un registro por id, 
export const deletePaciente = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await fetch(`http://localhost:3300/api/v1/pacientes/${req.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 404) {
      console.log("Paciente no encontrado");
      res.status(404).send("Paciente no encontrado");
    } else if (response.status >= 200 && response.status < 300) {
      console.log("Paciente eliminado");
      res.redirect("/info");
    } else {
      const error = await response.json();
      console.error("Error al eliminar el paciente", error);
      res.status(response.status).send("Error al eliminar el paciente");
    }
  } catch (error) {
    console.error("Error al eliminar el paciente", error);
    res.status(500).send("Error al borrar el paciente");
  }
};


export const loginUsuario = async (req, res) => {
  const { usuario, pass } = req.body;
  try {
    const response = await fetch("http://localhost:3300/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ usuario, pass }),
    });
    if (response.status !== 200) {
      const error = await response.json();
      console.error("error al hacer login", error);
      Swal.fire({
        icon: "error",
        title: "Error al hacer login",
        text: "Usuario o contraseña incorrectos",
      });
        res.status(500).send("Error al hacer login");
    } else {
      const registro = await response.json();
      console.log("Usuario logeado satisfactoriamente", registro);
      Swal.fire({
        icon: "success",
        title: "Bienvenido al panel",
        text: "Ingreso exitoso",
      });
      res.redirect("/info");
    }
  } catch (error) {
    console.error("Error al logearse", error);
    Swal.fire({
      icon: "error",
      title: "Error al logearse",
      text: "Ha ocurrido un error en el servidor",
    });
    res.status(500).send("Error al logearse");
  }
};

// // registra un nuevo paciente en la ruta login
// export const loginUsuario = async (req, res) => {
//   const {usuario, pass} = req.body
//   try {
//     const response = await fetch("http://localhost:3300/api/v1/login/", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//        },
//        body: JSON.stringify({usuario, pass})
       
//     });
//     if (response.status !== 200) { //se tiene que sincronizar los status del back con el frontend
//       const error = await response.json();
//       console.error("error al hacer login", error);
//       res.status(500).send("Error al hacer login");
//     } else {
//       const registro = await response.json();
//       console.log("Usuario logeado satifactoriamente", registro);
//       res.redirect("/info");
//     }
//   } catch (error) {
//     console.error("Error al logearse", error);
//     res.status(500).send("Error al logearse")
//   }
// };


export const logout = async () => {
  const response = await fetch('http://localhost:3300/logout', {
    method: 'GET',
    credentials: 'include',
  });
  if (response.status === 200) {
    // Logout successful, redirect to login page or home page
    window.location.href = '/';
  } else {
    // Handle error
  }
};



// logout paciente
export const logOut = async (req, res) => {
  }
