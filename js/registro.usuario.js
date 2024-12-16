// Obtener el formulario de registro 
const formulario = document.getElementById('registroForm');

// Función para manejar el registro de usuarios
formulario.addEventListener('submit', function (event) {
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

    // Verificar si el correo ya existe
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        Swal.fire({text: 'Este correo electrónico ya está registrado.', icon: 'error'});
        return;
    }

    // Crea el usuario
    let usuario = {
        nombre,
        apellido,
        email,
        contrasena
    };

    // Guarda el usuario en el array de usuarios
    usuarios.push(usuario);

    // Guardr el usuario en el sessionStorage y simula inicio de sesión
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Muestra mensaje de éxito y inicia sesión (por ahora que no hay base de datos, 
    //de lo contrario se enviaría mail de confirmación para activar la cuenta)
    Swal.fire({text: '¡Registro exitoso! Ha iniciado sesión automáticamente.', icon: 'success'});

    setTimeout(() => {
        window.location.href = "../index.html"; // Redirigir a la página principal
    }, 2000);
});
