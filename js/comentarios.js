document.addEventListener("DOMContentLoaded", function () {
    // Array de comentarios
    const comentarios = [
        {
            nombre: "María G.",
            producto: "Anillo Oro 18k",
            calificacion: 5,
            comentario: "Me encantó el anillo que compré, ¡es aún más bonito en persona!"
        },
        {
            nombre: "Juan P.",
            producto: "Pulsera de brillantes",
            calificacion: 4,
            comentario: "Excelente servicio y entrega rápida. La pulsera es hermosa, aunque un poco más cara de lo esperado."
        },
        {
            nombre: "Ana L.",
            producto: "Aros Oro 18k",
            calificacion: 5,
            comentario: "La calidad de las joyas es impresionante. Sin duda volveré a comprar."
        },
        {
            nombre: "Carlos R.",
            producto: "Anillo plata 950",
            calificacion: 3,
            comentario: "Bonitas joyas, pero el envío tardó más de lo que esperaba."
        },
        {
            nombre: "Elena M. ",
            producto: "Collar y dije Oro 18k",
            calificacion: 5,
            comentario: "Un excelente regalo para mi madre. ¡Le encantó!"
        },
    ];

    // Función para cargar los comentarios en el HTML
    function cargarComentarios() {
        var listaComentarios = document.getElementById('lista-reseñas');
        

        if(localStorage.getItem('comentarios') !== null) {
            comentarios.push(...JSON.parse(localStorage.getItem('comentarios')));
        }
        listaComentarios.innerHTML = '';

        comentarios.forEach(comentario => {
            // Crear elementos HTML para cada comentario
            var divReseña = document.createElement('div');
            divReseña.classList.add('reseña');

            var h4 = document.createElement('h4');
            h4.textContent = `${comentario.nombre} ${'⭐'.repeat(comentario.calificacion)}`; // Dependiendo de la calificación

            var prod = document.createElement('p');
            prod.textContent = `Producto: ${comentario.producto}`;

            var p = document.createElement('p');
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

        // Verificar si el usuario está en localStorage (autenticado)
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
