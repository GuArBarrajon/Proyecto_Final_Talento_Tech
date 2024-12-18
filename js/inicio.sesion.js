// Función para el inicio de sesión
const iniciarSesion = document.getElementById('inicioForm');

iniciarSesion.addEventListener('submit', async function (event) {
    event.preventDefault(); // Para evitar que el formulario se envíe normalmente
    
    // Obtener los datos del formulario
    let email = document.getElementById('email').value;
    let password = document.getElementById('contrasena').value;
    
    console.log('Email:', email);
    console.log('Contraseña:', password);

    try {
        // Cargar los usuarios desde el archivo JSON
        const usuarios = await cargarJson('../data/usuarios.json'); 
        
        // Buscar el usuario en el array de usuarios cargado desde el JSON
        let usuario = usuarios.find(user => user.email === email && user.contrasena === password);
        
        if (usuario) {
            // Guarda el usuario en localStorage y simula el inicio de sesión
            localStorage.setItem('usuario', JSON.stringify(usuario));
            Swal.fire({text: '¡Iniciaste sesión exitosamente!', icon: 'success'});

            setTimeout(() => {
                window.location.href = "../index.html"; // Redirige a la página principal
            }, 2000);
        } else {
            // Muestra un mensaje de error si no se encuentra el usuario
            Swal.fire({text: 'Correo o contraseña incorrectos.', icon: 'error'});
        }
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        Swal.fire({text: 'Hubo un problema al cargar los datos. Intenta nuevamente.', icon: 'error'});
    }
});

