ListadoDinamico.js

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".listaProductos");

  // Rutas corregidas para tu estructura de archivos: los JSON están en la carpeta 'data/'
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
      // Intenta cargar todos los archivos JSON simultáneamente
      const respuestas = await Promise.all(archivosJSON.map(r => fetch(r)));
      
      // Verifica si alguna respuesta fue incorrecta (ej. 404 No encontrado)
      for (const respuesta of respuestas) {
          if (!respuesta.ok) {
              throw new Error(`Error al cargar el archivo: ${respuesta.url}, estado: ${respuesta.status}`);
          }
      }
      
      // Parsea todas las respuestas a JSON
      const datos = await Promise.all(respuestas.map(r => r.json()));

      // Unir todos los productos en un solo array.
      // Usa Object.values(d)[0] para obtener el array de productos de cada objeto JSON.
      platos = datos.flatMap(d => Object.values(d)[0]);

      // Muestra la primera tanda de platos
      mostrarMasPlatos();
    } catch (error) {
      console.error("Error crítico al cargar los archivos JSON:", error);
      // Opcional: mostrar un mensaje de error al usuario en el contenedor
      contenedor.innerHTML = "<p style='color: red; padding: 20px; text-align: center;'>Error al cargar el menú. Por favor, verifica la ruta de tus archivos JSON.</p>";
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

  // Detectar scroll al final para carga infinita
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Si quedan platos por cargar y el usuario está cerca del final de la página
    if (indice < platos.length && (scrollTop + clientHeight >= scrollHeight - 50)) {
      mostrarMasPlatos();
    }
  });

  // Inicializar la carga
  await cargarTodosLosPlatos();
});