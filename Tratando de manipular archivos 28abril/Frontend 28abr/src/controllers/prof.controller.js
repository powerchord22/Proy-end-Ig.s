

// Ver todos los profesionales (RENDERIZA EN RUTAS CREATE/EDIT)
export const allProfesionales = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3300/api/v1/profesional", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

      if (response.status !== 200) {
          const error = await response.json();
          console.error("error al obtener todos los profesionales", error);
          res.status(500).send("Error al obtener todos los profesionales");
    } else {
          const profesional = await response.json();
          res.render("create", { profesional, title: "Ver todos los profesionales" }); // Mantenemos la ruta anterior y agregamos el título
          res.render("edit", { profesional, title: "Editar profesional" }); // Agregamos la nueva ruta
          res.render("info", { profesional, title: "Mostrar profesional CARD" }); //
    }
  } catch (error) {
    console.error("Error al obtener todos los profesional", error);
    res.status(500).send("Error al obtener todos los profesional")
  }
};
