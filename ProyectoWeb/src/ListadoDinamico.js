

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".listaProductos");

  // Rutas a todos los archivos JSON
  const archivosJSON = [
    "data/productosPasta.json", 
    "data/productosSandwich.json", 
    "data/productosEspecialidad.json", 
    "data/productosNuggets.json", 
    "data/productosEnsalada.json" 
  ];

  let platos = [];
  let indice = 0;
  const cantidadPorCarga = 4; // cantidad de platos por tanda

  // Crea el HTML de cada producto
  function crearProducto(plato) {
    const producto = document.createElement("div");
    producto.classList.add("producto");

    producto.innerHTML = `
      <div class="textoProducto">
        <p class="nombreProducto">${plato.nombre}</p>
        <p class="descripcionProducto">${plato.descripcion || "Descripción no disponible."}</p>
      </div>
      <div class="contenedorFotoProducto">
        <img class="fotoProducto" src="${plato.imagen}" alt="${plato.nombre}">
      </div>
    `;
    return producto;
  }

  // Cargar todos los archivos JSON y combinarlos
  async function cargarTodosLosPlatos() {
    try {
      const respuestas = await Promise.all(archivosJSON.map(r => fetch(r)));
      const datos = await Promise.all(respuestas.map(r => r.json()));

      // Unir todos los productos en un solo array
      platos = datos.flatMap(d => Object.values(d)[0]);

      mostrarMasPlatos();
    } catch (error) {
      console.error("Error al cargar los archivos JSON:", error);
    }
  }

  // Muestra más platos (por tandas)
  function mostrarMasPlatos() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cantidadPorCarga && indice < platos.length; i++, indice++) {
      fragment.appendChild(crearProducto(platos[indice]));
    }

    contenedor.appendChild(fragment);
  }

  // Detectar scroll al final
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      mostrarMasPlatos();
    }
  });

  // Inicializar
  await cargarTodosLosPlatos();
});