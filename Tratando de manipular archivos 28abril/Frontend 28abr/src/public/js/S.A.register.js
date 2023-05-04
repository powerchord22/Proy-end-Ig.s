

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Muestra una alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres registrarte con estos datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrarme',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Envía el formulario si el usuario confirma la alerta
        event.target.submit();
      }
    });
  });