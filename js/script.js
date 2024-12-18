//En este archivo se manejan variables globales y funciones que abarcan todo el proyecto como carga de header, modales, productos y footer  
//de forma dinámica, manejo del localStorage, manejo de carrito, etc.

//capturamos el precio del dolar almacenado en el localStorage
const precioDolar = localStorage.getItem('dolarPrice');

// Función para cargar el contenido común del header, modales y footer
function cargarHeaderFooter() {
    // Selecciona los elementos donde insertar el contenido
    const headerContainer = document.querySelector('header');
    const footerContainer = document.querySelector('footer');
    const modalesContainer = document.getElementById('modales');

    // Realiza una solicitud para cargar el archivo header-footer.html
    fetch('../pages/header-footer.html')
        .then(response => response.text())
        .then(html => {
            // Inserta el contenido de header-footer.html en los lugares correspondientes
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Verifico si hay usuario logueado
            const usuario = JSON.parse(localStorage.getItem('usuario'));

            // Verifica si el usuario está logueado (usuario debe ser un objeto válido)
            const isUserLoggedIn = usuario && typeof usuario === 'object' && usuario !== null;

            // Si hay usuario logueado, muestra el segundo header (con el email, botón cerrar sesión y contador del carrito), caso contrario el primero
            if (isUserLoggedIn) {
                //1.asignamos el email del usuario
                tempDiv.querySelector('div #header2 .header__links a ').innerHTML = usuario.email;
                //2.asignamos el contador del carrito
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const contadorCarrito = carrito.length;
                tempDiv.querySelector('#cantidad_carrito').innerHTML = contadorCarrito;
                //cargamos el header
                headerContainer.innerHTML = tempDiv.querySelector('div #header2').innerHTML;
            } else {
                //cargamos el header sin usuario ni contador del carrito
                headerContainer.innerHTML = tempDiv.querySelector('header').innerHTML;
            }

            // Carga el contenido de modales y footer
            if (modalesContainer && footerContainer) {
                footerContainer.innerHTML = tempDiv.querySelector('footer').innerHTML;
                modalesContainer.innerHTML = tempDiv.querySelector('#modales').innerHTML;
            }

            //setear la moneda
            const moneda = document.getElementById("moneda");
            const monedaGuardada = localStorage.getItem('moneda');

            if (monedaGuardada === 'dolar') {
                moneda.textContent = "U$S";
            }

        })
        .catch(error => {
            console.error('Error al cargar el archivo de header y footer:', error);
        });
}
// Llama la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarHeaderFooter);

// Función para mostrar el menu del celular
(function () {
    const listElements = document.querySelectorAll('.menu__item--show');
    const list = document.querySelector('.menu__links');
    const menu = document.querySelector('.menu__hamburguer');
    const addClick = () => {
        listElements.forEach(element => {
            element.addEventListener('click', () => {
                let subMenu = element.children[1];
                let height = 0;
    
                element.classList.toggle('menu__item--active');
                
                // Verifica si el submenú tiene un estilo inline de altura
                if (subMenu.style.height === '' || subMenu.style.height === '0px') {
                    height = subMenu.scrollHeight;  // Asigna la altura natural del submenú
                }
                
                subMenu.style.height = `${height}px`;
                subMenu.style.transition = 'height 0.3s ease-in-out';
            });
        });
    }
    
    
        window.addEventListener('resize', () => {
            if(window.innerWidth > 800) {
                //deleteStyleHeight(); 
                if(list.classList.contains('menu__links--show')) {
                    list.classList.remove('menu__links--show');
                }
            }
            else {
                addClick();
            }
            location.reload();
        }); 
        
        if(window.innerWidth <= 800) {
            addClick();
        }
        
        if (menu) {
            menu.addEventListener('click', () => {
                list.classList.toggle('menu__links--show');
            });
        }    
})();


// Función para cerrar sesión
function cerrarSesion() {
    // Elimina el usuario y carrito del localStorage y redirige a la página de inicio
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    //Mensaje
    Swal.fire({text: 'Ha cerrado sesión. Gracias por visitarnos', icon: 'success'});
    setTimeout(() => {
        window.location.href = "../index.html"; // Redirige a la página principal
    }, 2000);  
}


//función para cambiar moneda en el botón y guardarla en el localStorage
function cambiarMoneda() {
    const moneda = document.getElementById("moneda");
    
    if (moneda.textContent === "$") {
        localStorage.setItem('moneda', 'dolar');
        moneda.textContent = "U$S";

        location.reload();
    } else {
        moneda.textContent = "$";
        localStorage.setItem('moneda', 'pesos');

        location.reload();
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Mostrar productos por tipo
async function mostrarProductos() {
    const contenedorPulseras = document.getElementById('productos-pulseras');
    const contenedorAros = document.getElementById('productos-aros');
    const contenedorPrendedores = document.getElementById('productos-prendedores');
    const contenedorGemelos = document.getElementById('productos-gemelos');
    const contenedorRelojes = document.getElementById('productos-relojes');
    const contenedorLingotes = document.getElementById('productos-lingotes');
    const contenedorAlianzas = document.getElementById('productos-alianzas');
    const contenedorAnillos = document.getElementById('productos-anillos');
    const contenedorCadenas = document.getElementById('productos-cadenas');

    const moneda = localStorage.getItem('moneda');
    let signo = '$';

    const productos = await cargarJson('../data/productos.json');

    // Filtramos productos por tipo y los agregamos a su contenedor correspondiente(si los encuentra)
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        let precioProducto = producto.precio;

        //cambiando el precio y signo según moneda elegida
        if (moneda === 'dolar'){
            precioProducto = (producto.precio / precioDolar).toFixed(2);
            signo = 'U$S';
        }

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen" onclick="verImagen(${producto.id})">
            <h4>${producto.nombre}</h4>
            <p>${signo} ${precioProducto.toLocaleString()}</p>
            <a href="javascript:void(0)" class="boton" onclick="agregarCarrito(${producto.id})">Agregar al carrito</a>
        `;

        if (contenedorPulseras !== null && producto.tipo === 'Pulsera') {
            contenedorPulseras.appendChild(divProducto);
        } else if (contenedorAros !== null &&  producto.tipo === 'Aro') {
            contenedorAros.appendChild(divProducto);
        } else if (contenedorPrendedores !== null && producto.tipo === 'Prendedor') {
            contenedorPrendedores.appendChild(divProducto);
        } else if (contenedorGemelos !== null && producto.tipo === 'Gemelo') {
            contenedorGemelos.appendChild(divProducto);
        } else if (contenedorRelojes !== null && producto.tipo === 'reloj') {
            contenedorRelojes.appendChild(divProducto);
        } else if (contenedorLingotes !== null &&  producto.tipo === 'lingote') {
            contenedorLingotes.appendChild(divProducto);
        } else if (contenedorAlianzas !== null && producto.tipo === 'alianza') {
            contenedorAlianzas.appendChild(divProducto);
        } else if (contenedorAnillos !== null && producto.tipo === 'anillo') {
            contenedorAnillos.appendChild(divProducto);
        } else if (contenedorCadenas !== null && producto.tipo === 'cadena') {
            contenedorCadenas.appendChild(divProducto);
        } 
    });
}
// Inicializar
mostrarProductos();

// Ver imagen ampliada
async function verImagen(id) {
    //cargamos los productos desde el json
    const productos = await cargarJson('../data/productos.json');

    const producto = productos.find(p => p.id === id);
    document.getElementById('modal-imagen-img').src = producto.imagen;
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-imagen').style.display = 'block';
}

// Cerrar modales
function closeModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
    if (idModal !== 'modal-imagen') {
        location.reload();
    }
    
}

//----------------------------------------------------
//   CARRITO

// Agregar al carrito
async function agregarCarrito(id) {
    //cargamos los productos desde el json
    const productos = await cargarJson('../data/productos.json');

    //Primero verifica si el usuario está en localStorage (autenticado)
    const usuario = localStorage.getItem('usuario'); 

    if (usuario) {
        //Luego busca el producto en el array de productos
        const producto = productos.find(prod => prod.id === id);

        // se obtiene el carrito del localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verifica si el producto ya está en el carrito
        const productoExistente = carrito.find(prod => prod.id === id);

        if (productoExistente) {
            Swal.fire({text: 'Este producto ya está en tu carrito.', icon: 'info'}); 
        } else {
            // Si el producto no está en el carrito, lo agregamos
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito(); // Actualizar la vista del carrito
        }
    } else {
        // Si el usuario no está autenticado
        Swal.fire({text: 'Debe iniciar sesión para comprar.', icon: 'warning'});
    }
}

// Mostrar carrito
function mostrarCarrito() {

    // Verificar si el usuario está en localStorage (autenticado)
    const usuario = localStorage.getItem('usuario'); 

    if (usuario) {

        // Si el usuario está autenticado
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaCarrito = document.getElementById('carrito-lista');
        listaCarrito.innerHTML = ''; // Limpiar lista
        let total = 0;
        let suma = 0;
        let signo = '$';

        carrito.forEach(producto => {
            //fijamos el precio del producto
            let precioProducto = producto.precio;

            const moneda = localStorage.getItem('moneda');

            if (moneda === 'dolar'){
                //si seleccionó dólares, mostrar el precio en dólares
                signo = 'U$S ';
                precioProducto = (producto.precio / precioDolar).toFixed(2);
            ;}

            const li = document.createElement('li');
            li.innerHTML = `<span>${producto.nombre}</span> <span>${signo}${precioProducto.toLocaleString()} </span> <button class="boton2 btn3" onclick="eliminarDelCarrito(${producto.id})"><img class="btn_eliminar" src="../assets/icons/basura.svg" alt="Eliminar"></button>`;
            listaCarrito.appendChild(li);

            total += producto.precio;
            suma = total;
            localStorage.setItem('total', total);
            
            //dependiento de la moneda elegida
            if (moneda === 'dolar'){
                suma = (total/precioDolar).toFixed(2);
            }
            
        });
        document.getElementById('total-carrito').textContent = signo + suma;
        document.getElementById('modal-carrito').style.display = 'block';

    } else {
        // Si el usuario no está autenticado
        Swal.fire({text: 'Debe iniciar sesión para comprar.', icon: 'warning'});
    }

}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}


// Realizar la comprar
function realizarCompra() {
    if (localStorage.getItem('carrito') === null || localStorage.getItem('carrito') === '[]') {
        Swal.fire({text: 'No hay productos en el carrito.', icon: 'info'});
        return;
    }
    
    document.getElementById('modal-pago').style.display = 'block';
    const totalCompra = document.getElementById('totalCompra');
    let totalCarrito = localStorage.getItem('total');
    let precioDolar = localStorage.getItem('dolarPrice');
    

    const moneda = localStorage.getItem('moneda');
    if (moneda === 'dolar'){
        totalCarrito = (totalCarrito / precioDolar).toFixed(2);
        totalCompra.textContent = `U$S ${totalCarrito.toLocaleString()} `;
    } else {
        totalCompra.textContent = `$ ${totalCarrito.toLocaleString()} `;
    }

    //Función para pagar compra
    const form = document.getElementById('paymentForm');//captura formulario
    const composObligatorios = form.querySelectorAll('input[required]');//captura los campos obligatorios
    
    form.addEventListener('submit', function (event){
        event.preventDefault();

        //chequea si los campos están completos
        if(Array.from(composObligatorios).every(input => input.value.trim() !== "")){
            localStorage.removeItem('carrito');
            localStorage.removeItem('total');
            
            Swal.fire({
                text: 'Operación realizada con éxito. Gracias por confiar en nosotros.',
                icon: 'success',
                timer: 3000, 
                willClose: ( ) => {
                    //Cerrar el modal después de que SweetAlert haya terminado
                    closeModal('modal-pago');
                }
            });
        }
    });
}

// Para mostrar una frase aleatoria sobre los videos
const fraseElement = document.querySelector('#fraseAleatoria');
if (fraseElement !== null) { 
    cargarJson('../data/frases.json').then(frases => {
        // Aseguramos que el array no está vacío antes de acceder a un elemento
        if (frases && frases.length > 0) {
            fraseElement.textContent = frases[Math.floor(Math.random() * frases.length)].texto;
        }
    });
    
}

//función para traer la información de los archivos json
async function cargarJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}