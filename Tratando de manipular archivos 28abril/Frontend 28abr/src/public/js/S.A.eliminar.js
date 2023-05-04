
    $(document).on('click', '.delete-btn', function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        Swal.fire({
            title: '¿Estás seguro en eliminar registro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = url;
            }
        })
    });
