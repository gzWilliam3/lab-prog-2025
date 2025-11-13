// Variables globales
const contenedor = document.querySelector(".listaProductos");
let datosCompletos = {};
let productos = []; // array o subarreglo que se va a mostrar
let indice = 0;
const cantidadPorCarga = 2;
let cargando = false;
window.votarPlato = votarPlato;

// Inicializo y cargo datos del json
document.addEventListener("DOMContentLoaded", () => {
    if(contenedor){
        // Cargo datos de la API
        fetch("/api/datosProductos")
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

// funcion de filtrado
function configurarMenuNav(){
    const elementosMenuNav = document.querySelectorAll(".navContenedorComidas .listado a");

    // segun en que boton del menu se haga click, se asigna categoria
    elementosMenuNav.forEach(elto => {
        elto.addEventListener("click", e => {
            e.preventDefault(); // Para que el enlace no recargue la página
            const categoria = elto.dataset.categoria; // "todosProductos", "productosPasta", etc
            
            // Llama a la funcion principal de filtrado
            filtrarYMostrar(categoria);
        });
    });
}

function filtrarYMostrar(categoria){
    contenedor.innerHTML = ""; // reinicio contenedor
    indice = 0;
    cargando = false;

    // condicional que asigna un subarreglo segun la categoria que ingreso como parametro
    if(categoria === "todosProductos"){
        productos = Object.values(datosCompletos).flat();
    }
    else{
        productos = datosCompletos[categoria] || []; 
    }

    cargarProductos();
}

function cargarProductos() {
    if (cargando) return; // evita cargas multiples si ya esta cargando
    if (indice >= productos.length) return; // por si no hay mas platos que cargar

    cargando = true;
    const fragment = document.createDocumentFragment();

    // define cuantos cargar: la cantidadPorCarga o los que queden
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
    
    // actualizo indice para prox carga
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
        <button class="btnVotar" data-id:"${plato.id}">Votar</button>
      </div>
    `;

    const btnVotar = producto.querySelector('.btnVotar');
    btnVotar.addEventListener('click', () => {
        votarPlato(plato.id);
    });

    return producto;
}

function cargarMasAlScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      cargarProductos();
    }
}

function votarPlato(id) {
  // Traer votos guardados.
  const votos = JSON.parse(localStorage.getItem("votosPlatos")) || {}; //duda

  votos[id] = (votos[id] || 0) + 1;

  // Guarda votos
  localStorage.setItem("votosPlatos", JSON.stringify(votos));

  const aviso = document.createElement("div");
  aviso.textContent = "¡Gracias por tu voto!";
  aviso.classList.add("mensajeVoto");
  document.body.appendChild(aviso);
  setTimeout(() => aviso.remove(), 1500);
}
