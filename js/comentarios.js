document.addEventListener("DOMContentLoaded", function () {
    async function cargarComentarios() {
        const listaComentarios = document.getElementById('lista-reseñas');
    
        // Carga los comentarios desde el archivo JSON
        const comentarios = await cargarJson('../data/comentarios.json'); 

        if(localStorage.getItem('comentarios') !== null) {
            comentarios.push(...JSON.parse(localStorage.getItem('comentarios')));
        }
        listaComentarios.innerHTML = '';
    
        // Itera sobre cada comentario y agrega al HTML
        comentarios.forEach(comentario => {
            // Crea los elementos HTML para cada comentario
            const divReseña = document.createElement('div');
            divReseña.classList.add('reseña');
    
            const h4 = document.createElement('h4');
            h4.textContent = `${comentario.nombre} ${'⭐'.repeat(comentario.calificacion)}`; // Dependiendo de la calificación
    
            const prod = document.createElement('p');
            prod.textContent = `Producto: ${comentario.producto}`;
    
            const p = document.createElement('p');
            p.textContent = `"${comentario.comentario}"`;
    
            divReseña.appendChild(h4);
            divReseña.appendChild(prod);
            divReseña.appendChild(p);
    
            listaComentarios.appendChild(divReseña);
        });
    }

    // Llamamos a la función para cargar los comentarios al iniciar la página
    cargarComentarios();

    // Función para manejar el formulario de comentarios
    const formReseña = document.getElementById('form-reseña');
    formReseña.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const nombre = document.getElementById('nombre').value;
        const producto = document.getElementById('producto').value;
        const calificacion = parseInt(document.getElementById('calificacion').value);
        const comentario = document.getElementById('comentario').value;

        // Verifica si el usuario está en localStorage (autenticado)
        const usuario = localStorage.getItem('usuario'); 

        if (usuario) {
            // Si el usuario está autenticado, almacena el comentario en el localStorage
            const nuevoComentario = { nombre, producto, calificacion, comentario };
            let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentariosGuardados.push(nuevoComentario);
            localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

            // Actualizar la lista de comentarios
            cargarComentarios();

            // Mostrar mensaje
            Swal.fire({text: '¡Gracias por su comentario!', icon: 'success'});

            setTimeout(() => {
                // Limpia el formulario
                formReseña.reset();
                location.reload();
            }, 2000);
            
        } else {
            // Si el usuario no está autenticado, mostrar el mensaje
            Swal.fire({text: 'Debe iniciar sesión para comentar.', icon: 'warning'});
        }
    });
});
