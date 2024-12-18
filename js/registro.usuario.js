// Obtener el formulario de registro
const formulario = document.getElementById('registroForm');

// Función para manejar el registro de usuarios
formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmar_contrasena').value;

    // Validaciones
    if (contrasena !== confirmarContrasena) {
        Swal.fire({text: 'Las contraseñas no coinciden.', icon: 'warning'});
        return;
    }

    if (contrasena.length < 8 || contrasena.length > 12) {
        Swal.fire({text: 'La contraseña debe tener entre 8 y 12 caracteres.', icon: 'warning'});
        return;
    }

    try {
        // Carga los usuarios desde el archivo JSON
        const usuarios = await cargarJson('../data/usuarios.json');

        // Verifica si el correo ya existe
        const usuarioExistente = usuarios.find(user => user.email === email);
        if (usuarioExistente) {
            Swal.fire({text: 'Este correo electrónico ya está registrado.', icon: 'error'});
            return;
        }

        // Crear el nuevo usuario
        let usuario = {
            id: usuarios.length + 1, // Generamos un nuevo ID, basado en la longitud del array
            nombre,
            apellido,
            email,
            contrasena
        };

        // Guardamos el usuario en el sessionStorage para simular el inicio de sesión
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Muestra mensaje de éxito y simula el inicio de sesión
        Swal.fire({text: '¡Registro exitoso! Ha iniciado sesión automáticamente.', icon: 'success'});

        setTimeout(() => {
            window.location.href = "../index.html"; // Redirigir a la página principal
        }, 2000);
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        Swal.fire({text: 'Hubo un problema al cargar los datos. Intenta nuevamente.', icon: 'error'});
    }
});

