//En este archivo se manejan variables globales y funciones que abarcan todo el proyecto como carga de header, modales, productos y footer  
//de forma dinámica, manejo del localStorage, manejo de carrito, etc.

//capturamos el precio del dolar almacenado en el localStorage
const precioDolar = localStorage.getItem('dolarPrice');

// Array de los usuarios registrados (sólo 2 para pruebas)
var usuarios = [
    { "nombre": "Gustavo", "apellido": "Barrajón", "email": "admin@admin.com", "contrasena": "12345678" },
    { "nombre": "Roberto", "apellido": "Pérez", "email": "rperez@gmail.com", "contrasena": "12345678" }
];

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
//arrays de productos
const productos = [
    { id: 1, tipo: 'Pulsera', nombre: 'Pulsera Oro 18 Kilates- Palitos y Rombos', precio: 350000, imagen: '../assets/images/Pulsera1.webp', descripcion: 'Una hermosa pulsera de oro 18K con palitos y rombos.'},
    { id: 2, tipo: 'Pulsera', nombre: 'Pulsera Oro 18 Kilates- Centro Con Brillantes', precio: 565000, imagen: '../assets/images/Pulsera2.webp', descripcion: 'Elegante pulsera con brillantes en el centro, ideal para cualquier ocasión.' },
    { id: 3, tipo: 'Pulsera', nombre: 'Pulsera Oro 18 Kilates- Esclava Facetada', precio: 732000, imagen: '../assets/images/Pulsera3.webp', descripcion: 'Pulsera esclava con facetas, hecha de oro 18K.' },
    { id: 4, tipo: 'Pulsera', nombre: 'Pulsera Oro 18 Kilates - Eslabón Tejido', precio: 877000, imagen: '../assets/images/Pulsera4.jpg', descripcion: 'Pulsera tejida en eslabones de oro 18K, elegante y moderna.' },
    { id: 5, tipo: 'Aro', nombre: 'Argollas Oro Blanco 18 Kilates', precio: 439000, imagen: '../assets/images/aros1.jpg',  descripcion: 'Argollas de oro blanco 18K, sofisticadas y elegantes.'  },
    { id: 6, tipo: 'Aro', nombre: 'Aro Colgante con Cubic Central', precio: 619000, imagen: '../assets/images/aros2.webp', descripcion: 'Aro colgante con cubic central, un diseño moderno y llamativo.' },
    { id: 7, tipo: 'Aro', nombre: 'Media Argolla Con Zafiros', precio: 630000, imagen: '../assets/images/aros3.jpg', descripcion: 'Hermosa media argolla con zafiros, sofisticada y brillante.' },
    { id: 8, tipo: 'Aro', nombre: 'Aros Oro 18K - Agua Marina y Brillantes', precio: 875000, imagen: '../assets/images/aros4.webp', descripcion: 'Aros de oro 18K con agua marina y brillantes, un diseño exclusivo.' },
    { id: 9, tipo: 'Prendedor', nombre: 'Prendedor Oro 18 Kilates- Tres Perlas', precio: 215000, imagen: '../assets/images/Prendedor1.webp', descripcion: 'Prendedor de oro 18K con tres perlas blancas, un toque clásico y elegante.' },
    { id: 10, tipo: 'Prendedor', nombre: 'Prendedor Oro 18 Kilates- Flor Con Cubics', precio: 475000, imagen: '../assets/images/Prendedor2.webp', descripcion: 'Prendedor en forma de flor con cubics, diseño moderno y delicado.' },
    { id: 11, tipo: 'Prendedor', nombre: 'Prendedor Oro 18k - Platino y Brillantes', precio: 520000, imagen: '../assets/images/Prendedor3.webp', descripcion: 'Prendedor de oro 18K con platino y brillantes, para ocasiones especiales.'},
    { id: 12, tipo: 'Prendedor', nombre: 'Prendedor Oro 18 Kilates - Cartier con Brillantes', precio: 250000, imagen: '../assets/images/Prendedor4.webp', descripcion: 'Prendedor de alta gama con brillantes y diseño de Cartier.' },
    { id: 13, tipo: 'Gemelo', nombre: 'Gemelos Oro 18 Kilates', precio: 655000, imagen: '../assets/images/Gemelos1.webp', descripcion: 'Gemelos de oro 18K, elegancia y sofisticación para tu camisa.' },
    { id: 14, tipo: 'Gemelo', nombre: 'Gemelos Oro 18 Kilates', precio: 1102000, imagen: '../assets/images/Gemelos2.webp', descripcion: 'Gemelos de oro 18K con diseño único y detallado.' },
    { id: 15, tipo: 'Gemelo', nombre: 'Gemelos Oro 18 Kilates', precio: 1425000, imagen: '../assets/images/Gemelos3.jpg', descripcion: 'Elegantes gemelos de oro 18K, perfectos para eventos formales.' },   
    { id: 16, tipo: 'Gemelo', nombre: 'Gemelos de Plata', precio: 255000, imagen: '../assets/images/Gemelos4.jpg', descripcion: 'Gemelos de plata con un diseño simple pero elegante.' },
    { id: 17, tipo: 'reloj', nombre: 'Bulgari Solotempo', precio: 750000, imagen: '../assets/images/Reloj1.webp', descripcion: 'Reloj de lujo minimalista y elegante, con un diseño sofisticado de solo hora y materiales de alta calidad.' },
    { id: 18, tipo: 'reloj', nombre: 'Emporio Armani', precio: 775000, imagen: '../assets/images/Reloj2.webp', descripcion: 'Una pieza de lujo con un diseño moderno y elegante, que combina materiales de alta calidad y una estética sofisticada.' },
    { id: 19, tipo: 'reloj', nombre: 'Longines - Dolce Vita', precio: 1000000, imagen: '../assets/images/Reloj3.webp', descripcion: 'Reloj elegante y refinado, con un diseño rectangular clásico y materiales de alta calidad, que refleja un estilo sofisticado y atemporal.' },
    { id: 20, tipo: 'reloj', nombre: 'Cartier - Panthere', precio: 2250000, imagen: '../assets/images/Reloj4.webp', descripcion: 'Elegancia atemporal y sofisticación en un diseño icónico que combina lujo y delicadeza.' },
    { id: 21, tipo: "lingote", nombre: "Oro 24 kilates - 1 gramo", precio: 95030, imagen: "../assets/images/Lingotes-1g.webp", descripcion: "Lingote de oro puro 24K con un peso de 1 gramo."},
    { id: 22, tipo: "lingote", nombre: "Oro 24 kilates - 5 gramos", precio: 475150, imagen: "../assets/images/Lingotes-5g.webp", descripcion: "Lingote de oro puro 24K con un peso de 5 gramos." },
    { id: 23, tipo: "lingote", nombre: "Oro 24 kilates - 10 gramos", precio: 950300, imagen: "../assets/images/Lingotes-10g.webp", descripcion: "Lingote de oro puro 24K con un peso de 10 gramos."},
    { id: 24, tipo: "lingote", nombre: "Oro 24 kilates - 50 gramos", precio: 4751500, imagen: "../assets/images/Lingotes-50g.webp", descripcion: "Lingote de oro puro 24K con un peso de 50 gramos."},
    { id: 25, tipo: "alianza", nombre: "Alianza Media Caña", precio: 375000, imagen: "../assets/images/alianza-media-caña.webp", descripcion: "Elegante alianza de oro con diseño clásico de media caña." },
    { id: 26, tipo: "alianza", nombre: "Alianza Italiana", precio: 438000, imagen: "../assets/images/alianza-italiana.webp", descripcion: "Alianza de oro con un diseño refinado de estilo italiano." },
    { id: 27, tipo: "alianza", nombre: "Alianza Labrada", precio: 515000, imagen: "../assets/images/alianza-labrada.webp", descripcion: "Alianza de oro con grabados detallados y diseño único." },
    { id: 28, tipo: "alianza", nombre: "Alianza Tricolor", precio: 515000, imagen: "../assets/images/alianza-tricolor.webp", descripcion: "Alianza de oro combinando tonos amarillo, blanco y rosa." },
    { id: 29, tipo: "anillo", nombre: "Anillo Oro 18k - Brillante Central y Zafiros", precio: 235000, imagen: "../assets/images/Anillo1.webp", descripcion: "Anillo de oro con brillante central rodeado de zafiros."},
    { id: 30, tipo: "anillo", nombre: "Anillo Oro 18k - Sin Fin", precio: 338000, imagen: "../assets/images/Anillo2.webp", descripcion: "Anillo de oro 18K con diseño continuo sin fin." },
    { id: 31, tipo: "anillo", nombre: "Anillo Oro 18k - Tipo Flor con Cubics", precio: 395000, imagen: "../assets/images/Anillo3.webp", descripcion: "Anillo de oro con diseño floral adornado con piedras cúbicas." },
    { id: 32, tipo: "anillo", nombre: "Anillo Oro 18k - Perla Central y Brillantes", precio: 565000, imagen: "../assets/images/Anillo4.webp", descripcion: "Anillo de oro con una perla central rodeada de brillantes." },
    { id: 33, tipo: "cadena", nombre: "Cadena con Colgante Central tipo U con Brillantes", precio: 565000, imagen: "../assets/images/collar1.webp", descripcion: "Cadena de oro con un elegante colgante en forma de U decorado con brillantes."},
    { id: 34, tipo: "cadena", nombre: "Cadena Oro 18K - Cadena Tipo Clapton con Zafiro", precio: 630000, imagen: "../assets/images/collar2.webp", descripcion: "Cadena de oro 18K con diseño tipo Clapton adornada con un zafiro." },
    { id: 35, tipo: "cadena", nombre: "Cadena Oro 18K - Singapur con Nombre", precio: 630000, imagen: "../assets/images/collar3.webp", descripcion: "Cadena de oro 18K estilo Singapur personalizada con nombre." },
    { id: 36, tipo: "cadena", nombre: "Cadena Rolo con Dije Flor de Lis con Brillantes", precio: 689000, imagen: "../assets/images/collar4.jpg", descripcion: "Cadena estilo Rolo con un dije en forma de Flor de Lis decorado con brillantes."}
];

// Mostrar productos por tipo
function mostrarProductos() {
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
function verImagen(id) {
    const producto = productos.find(p => p.id === id);
    document.getElementById('modal-imagen-img').src = producto.imagen;
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-imagen').style.display = 'block';
}

// Cerrar modales
function closeModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
    location.reload();
}

//----------------------------------------------------
//   CARRITO

// Agregar al carrito
function agregarCarrito(id) {
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

//array de frases sobre los videos de publicidad    
const frases = ["Cada joya cuenta una historia; ¿cuál será la suya?", "Brille con la elegancia que sólo usted merece.",
    "Haga que cada momento sea inolvidable con nuestras piezas únicas.", "Regale un brillo eterno: el regalo perfecto para cualquier ocasión.",
    "Joyas que reflejan su esencia.","Transforme lo ordinario en extraordinario con nuestro toque brillante.",
    "Su estilo, sus joyas, su historia.", "Atrévase a brillar: elija la joya de sus sueños.","Joyas que celebran cada momento especial.",
    "El regalo perfecto para cualquier ocasión."];

// Para mostrar una frase aleatoria sobre los videos
const fraseElement = document.querySelector('#fraseAleatoria');
if (fraseElement !== null) { fraseElement.textContent = frases[Math.floor(Math.random() * frases.length)];}