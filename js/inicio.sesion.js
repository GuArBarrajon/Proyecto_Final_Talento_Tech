// Función para el inicio de sesión
const iniciarSesion = document.getElementById('inicioForm');

iniciarSesion.addEventListener('submit', function (event) {
    event.preventDefault(); // para evitar que el formulario se envíe normalmente
    
    // Obtener los datos del formulario
    let email = document.getElementById('email').value;
    let password = document.getElementById('contrasena').value;
    
    console.log('Email:', email);
    console.log('Contraseña:', password);

    // Buscar el usuario en el array de usuarios
    let usuario = usuarios.find(user => user.email === email && user.contrasena === password);
    
    console.log(usuario);
    if (usuario) {
        // Guardar el usuario en el sessionStorage y simular inicio de sesión
        localStorage.setItem('usuario', JSON.stringify(usuario));
        Swal.fire({text: '¡Iniciaste sesión exitosamente!', icon: 'success'});

        setTimeout(() => {
            window.location.href = "../index.html"; // Redirigir a la página principal
        }, 2000);
    } else {
        // Mostrar mensaje de error
        Swal.fire({text: 'Correo o contraseña incorrectos.', icon: 'error'});
    }

});
