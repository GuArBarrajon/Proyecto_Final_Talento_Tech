Descripción del Proyecto:

La página web ofrece una variedad de joyas y un sistema de carrito de compras.

Características Principales:

Interfaz Amigable: Navegación intuitiva y diseño responsivo.
Sistema de Carrito de Compras: Agrega productos fácilmente y realiza pagos seguros.

Creación del Proyecto:

El proyecto fue creado utilizando tecnologías como HTML, CSS, JavaScript. 
La idea surgió de la necesidad de un espacio digital para exhibir y vender joyas, aprovechando las tendencias actuales de comercio electrónico.

Detalle:

Página de Inicio: presenta las colecciones más recientes y ofertas especiales (los productos son insertados dinámicamente desde un archivo json de productos). Además ofrece la cotización del gramo de oro traída desde una API. También se pueden dejar reseñas sobre los productos (algunas son traidas desde un archivo json de comentarios y cargadas dinámicamente, las nuevas se almacenan en el LocalStorage y se traen desde él).Para comentar, el único requisito es ser un usuario registrado y estar logueado en la página. 

Páginas de inicio de sesión, recupero de contraseña y registro: existe un array de usuarios registrados para poder comprobar que el inicio de sesión y el recupero de contraseña funcionan (al iniciar sesión se almacena el usuario en le LocalStorage para así hacer las comprobaciones de si está logueado cuando quiera comentar o agregar productos al carrito). Recuperar el usuario cuando se olvidó la contraseña implicaría manejar una base de datos y el envío de un email con un token de seguridad, código que debería ser agregado ya que por ahora se limita a comprobar que el usuario exista en el array de usuarios y envía un mensaje de chequeo de correo para recuperar la cuenta (caso contrario, informa que el usuario no existe, todo usando Sweetalert). Al iniciar sesión desaparecen del header los botones "Ingresar" y "Registrarse", siendo reemplazados por el email del usuario y el botón de "cerrar sesión" respectivamente, además del contador del carrito. Al cerrar sesión el header vuelve a su estado anterior, aparece un mensaje de despedida con Sweetalert y se elimina del LocalStora el usuario y el carrito de compras si todavía contiene productos.

Catálogo de Productos: muestra las joyas disponibles (todas o por categoría), con imagen, nombre, precio y botón "agregar al carrito". Haciendo clic sobre las imágenes se ofrece una visión ampliada de las mismas y una descripción del producto con un modal. Clicando en el botón "agregar al carrito" se pueden sumar los distintos productos al carrito de compras, quitarlos (buscando los productos en el archivo json por su id, guardándolos y quitándolos del localStorage, y visualizándolo en un modal), ver el monto total y concretar la adquisición presionando en "realizar compra" (se abre un nuevo modal para ingresar datos de envío y los de la tarjeta, al pagar se envía al usuario un mensaje de operación exitosa con Sweetalert mientras se borra el carrito del localStorage), siempre que el usuario se encuentre registrado y haya iniciado sesión en la página. Además se puede acceder al carrito desde la barra de navegación, dónde se encuentra un contador de los productos elegidos y un botón que permite cambiar los montos en pesos a dólares y viceversa (con el valor del dólar actualizado desde una Api).

Páginas de "cuidado del las joyas", "medidor de anillos", "medios de pago", etc: ofrecen información estática sobre el seguimiento de envíos, cuidado de joyas, cómo se toman las medidas de los anillos, los medios de pago, etc. La página de contacto tiene un formulario que se envía usando Formspree.

Todas las páginas tienen header, modales y footer cargados desde "header-footer.html" usando Javascript.

Las Apis se cargan junto con el index.html y se guardan en el LocalStorage. La Api del precio del dólar es gratuita, pero la del precio del oro sólo ofrece gratuitamente 100 consultas al mes. Debido a que durante el desarrollo del proyecto rápidamente superé el número de consultas gratuitas se realizó una función que actualiza las Apis una vez al día, ya que al hacerlo se guarda en LocalStorage la fecha de la última consulta. Para que realice una nueva consulta el mismo día en el mismo navegador es necesario borrar la fecha de la última consulta del LocalStorage.   


Usuario = admin@admin.com
Contraseña = 12345678