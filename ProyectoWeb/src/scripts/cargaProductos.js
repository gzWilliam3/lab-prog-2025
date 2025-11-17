// Variables globales
const contenedor = document.querySelector(".listaProductos");
let datosCompletos = {};
let productos = []; // array o subarreglo que se va a mostrar.
let indice = 0;
const cantidadPorCarga = 2;
let cargando = false;
window.votarPlato = votarPlato; // Hace la función global para el onclick.

// Inicializo y cargo datos del json.
document.addEventListener("DOMContentLoaded", () => {
    if(contenedor){
        // Cargo datos de la API (RUTA RPC)
        fetch("/api/getDatosProductos") 
            .then(res => res.json())
            .then(datos => {
                // Guardo datos en variable
                datosCompletos = datos;

                // Fc previa al filtrado dw productos
                configurarMenuNav();

                // Muestro todos los productos por defecto al entrar pagina
                filtrarYMostrar("todosProductos");

                // Listener de scroll
                window.addEventListener("scroll", cargarMasAlScroll);
            })
            .catch(error => {
                console.error("Error al cargar el JSON: ", error);
            });
    }
})

// funcion de filtrado.
function configurarMenuNav(){
    const elementosMenuNav = document.querySelectorAll(".navContenedorComidas .listado a");

    // segun en que boton del menu se haga click, se asigna categoria.
    elementosMenuNav.forEach(elto => {
        elto.addEventListener("click", e => {
            e.preventDefault(); // Para que el enlace no recargue la página.
            const categoria = elto.dataset.categoria; // "todosProductos", "productosPasta", etc.
            
            // Llama a la funcion principal de filtrado.
            filtrarYMostrar(categoria);
        });
    });
}

function filtrarYMostrar(categoria){
    contenedor.innerHTML = ""; // reinicio contenedor.
    indice = 0;
    cargando = false;

    // condicional que asigna un subarreglo segun la categoria que ingreso como parametro.
    if(categoria === "todosProductos"){
        // Object.values().flat() junta todos los arrays de productos en uno solo.
        productos = Object.values(datosCompletos).flat(); 
    }
    else{
        productos = datosCompletos[categoria] || []; 
    }

    cargarProductos();
}

function cargarProductos() {
    if (cargando) return; // evita cargas multiples si ya esta cargando.
    if (indice >= productos.length) return; // por si no hay mas platos que cargar.

    cargando = true;
    const fragment = document.createDocumentFragment();

    // define cuantos cargar: la cantidadPorCarga o los que queden.
    const fin = Math.min(indice + cantidadPorCarga, productos.length);

    // bucle que crea el objeto visual de la pagina para cada producto de
    for (let i = indice; i < fin; i++) {
        const producto = productos[i];
        const eltoProducto = crearProducto(producto);

        fragment.appendChild(eltoProducto);
        // transicion
        setTimeout(() => eltoProducto.classList.add("visible"), 100 * (i - indice));
    }

    contenedor.appendChild(fragment);
    
    // actualizo indice para prox carga.
    indice = fin; 
    cargando = false;
}

// Crea la estructura HTML de un producto.
function crearProducto(plato) {
    const producto = document.createElement("div");
    producto.classList.add("producto");

    producto.innerHTML = `
      <div class="contenedorFotoProducto">
        <img class="fotoProducto" src="${plato.imagen}" alt="Imagen de ${plato.nombre}">
      </div>
      <div class="infoProducto">
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <button class="btnVotar" data-id="${plato.id}">Votar</button> 
        </div>
    `;

    const btnVotar = producto.querySelector('.btnVotar');
    btnVotar.addEventListener('click', () => {
        votarPlato(plato.id);
    });

    return producto;
}

function cargarMasAlScroll() {
    // Si el usuario está cerca del final de la página (500px antes).
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      cargarProductos();
    }
}


// Función que registra el voto en el servidor.
async function votarPlato(id) {
    try {
        // Llama al endpoint RPC para registrar el voto.
        const response = await fetch('/api/votarPlato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ platoId: id }),
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensajeVoto(data.mensaje); 
        } else {
            console.error("Error al votar:", data.mensaje);
            mostrarMensajeVoto("Error al registrar el voto.");
        }

    } catch (error) {
        console.error("Error de red al votar:", error);
        mostrarMensajeVoto("Error de conexión con el servidor.");
    }
}

// Muestra una notificación temporal al votar.
function mostrarMensajeVoto(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensajeVoto');
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 2000);
}