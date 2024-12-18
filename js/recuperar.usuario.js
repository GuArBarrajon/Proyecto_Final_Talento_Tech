//Función de restablecer contraseña (no hace nada porque no estoy usando base de datos así que no hay contraseña, ni 
// validación, ni token que enviar por mail). Sólo un simulacro

const recuperaContra = document.getElementById('recuperoForm');

if (recuperaContra) {
    recuperaContra.addEventListener('submit', async function (event) {
        event.preventDefault(); // Para evitar que el formulario se envíe normalmente
        
        // Obtiene los datos del formulario
        let email = document.getElementById('email').value;
        
        try {
            // Cargar los usuarios desde el archivo JSON
            const usuarios = await cargarJson('../data/usuarios.json');
            
            // Busca el usuario en el array de usuarios cargado desde el JSON
            let usuario = usuarios.find(user => user.email === email);

            if (usuario) {
                Swal.fire({text: 'La operación ha sido exitosa. Revise su correo y siga las instrucciones.', icon: 'success'});

                setTimeout(() => {
                    window.location.href = "../index.html"; // Redirige a la página principal
                }, 3000);
            } else {
                // Muestra mensaje de error si no se encuentra el usuario
                Swal.fire({text: 'No existe un usuario registrado con ese correo', icon: 'error'});
            }
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
            Swal.fire({text: 'Hubo un problema al cargar los datos. Intenta nuevamente.', icon: 'error'});
        }
    });
}
