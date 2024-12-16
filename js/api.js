//la Api del oro sólo ofrece 100 consultas al mes y se bloquea, por eso se me ocurrió que si ya se encuentra el precio
//en el localStorage, lo muestre sin hacer otra solicitud a la API y sólo se actualice una vez al día.

function consultarApiUnaVezAlDia() {
    // Se obtiene la fecha actual
    const fechaHoy = new Date().toISOString().split('T')[0]; 
    
    // Obtiene la fecha de la última consulta desde localStorage
    const ultimaConsulta = localStorage.getItem('ultimaConsulta');
    
    // Verificar si la fecha de la última consulta es diferente a la fecha de hoy
    if (ultimaConsulta !== fechaHoy) {
        // Si es diferente, realiza la consulta a la API
        consultaApi();

        // Almacena la fecha de la consulta de hoy
        localStorage.setItem('ultimaConsulta', fechaHoy);

        mostrarPrecio();
    } else {
        console.log('Ya has realizado la consulta hoy, no se hará otra.');
        mostrarPrecio();
    }
}

function consultaApi() {

    //URL de la API y la clave de acceso
    const apiUrl = 'https://www.goldapi.io/api/XAU/US'; 
    const apiKey = 'goldapi-11fc38sm4l5hj4o-io';

    //solicitud a la API de la cotización del oro
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'x-access-token': apiKey
        }
    })
    .then(response => response.json()) 
    .then(data => {
        // Extrae el precio del oro y otros datos
        const goldPrice = data.price;  // Precio del oro
        const askPrice = data.ask;  // Precio de compra
        const bidPrice = data.bid;  // Precio de venta
        let pricePerGram = data.price_gram_24k;  // Precio por gramo de oro 24K

        // Muestra los resultados en la consola
        console.log('Datos obtenidos de la API:', data);

        //precio por defecto si se bloquea la api 
        if (pricePerGram === undefined) {
            pricePerGram = 86.00;
        }

        //guarda el precio en el localStorage
        localStorage.setItem('precioOro', pricePerGram);

    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

    //solicitud a la API de la cotización del dolar blue
    fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
    .then(data => {
        bluePrice = data.venta;
        console.log(data)
        console.log(`El precio del dolar es ${bluePrice}`);
        
        //guarda el precio en el localStorage
        localStorage.setItem('dolarPrice', bluePrice);
    });
}

function mostrarPrecio() {

    //Muestra el precio en la página web 
    const moneda = localStorage.getItem('moneda');
    let dolar = Number(localStorage.getItem('dolarPrice'));
    let oro = Number(localStorage.getItem('precioOro'));

    if (dolar === 0) {
        dolar = 1100;
    }
    if (oro === 0) {
        oro = 86;
    }

    if (moneda === 'dolar') {
        document.getElementById('precio_gramo_oro').textContent = `Cotización del Oro: U$S ${oro.toFixed(2)} /gr.`;
    }
    else {
        let cotizaOro = oro * dolar;
        document.getElementById('precio_gramo_oro').textContent = `Cotización del Oro: $ ${cotizaOro.toFixed(2)} /gr.`;
    }
}

//llamamos a la api una vez al dia
consultarApiUnaVezAlDia();