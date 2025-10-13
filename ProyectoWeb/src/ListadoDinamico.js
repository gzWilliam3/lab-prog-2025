
document.addEventListener("DOMContentLoaded", async () => {

  
  // Contenedor principal donde se inyectará el HTML de los productos
  const contenedor = document.querySelector(".listaProductos");
  // Contenedor de la lista de enlaces <ul class="listado"> (este es tu nuevo filtroContenedor)
  const filtroContenedor = document.querySelector(".navContenedorComidas .listado"); 

  // Definición de las rutas a los archivos JSON.
  const archivosJSON = [
    { key: "productosPasta", url: "public/productosPasta.json" },
    { key: "productosSandwich", url: "public/productosSandwich.json" },
    { key: "productosEspecialidad", url: "public/productosEspecialidad.json" },
    { key: "productosNuggets", url: "public/productosNuggets.json" },
    { key: "productosEnsalada", url: "public/productosEnsalada.json" }
  ];

  // Variables de Estado
  let productosPorCategoria = {}; // Almacena las listas de productos por clave.
  let platosActuales = [];        // Array que contiene la lista de productos de la categoría seleccionada.
  
  let indice = 0;                  // Controla el punto de inicio de la paginación.
  const cantidadPorCarga = 4;      // Define cuántos platos se cargan con el scroll infinito.
S

  //Crea el elemento HTML (div.producto) para un plato dado.
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

  //Muestra la siguiente tanda de productos (scroll infinito).
  function mostrarMasPlatos() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cantidadPorCarga && indice < platosActuales.length; i++, indice++) {
      fragment.appendChild(crearProducto(platosActuales[indice]));
    }

    contenedor.appendChild(fragment);
  }


  //Cambia la lista de productos que se está mostrando y reinicia la paginación.
  function filtrarProductos(categoriaKey) {
      // 1. Usa la lista guardada con la clave del JSON (ej: 'productosPasta')
      platosActuales = productosPorCategoria[categoriaKey] || [];
      
      // 2. Reinicia las variables de paginación
      indice = 0; 
      contenedor.innerHTML = ""; // Limpia la vista anterior
      
      // 3. Muestra la primera tanda de la nueva categoría
      mostrarMasPlatos(); 
  }
  
  // Función que se ejecuta cada vez que el usuario hace scroll (Scroll infinito).
  const manejarScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Condición para cargar más platos: hay productos restantes Y estamos cerca del final.
    if (indice < platosActuales.length && (scrollTop + clientHeight >= scrollHeight - 50)) {
      mostrarMasPlatos();
    }
  };
  

  //Carga todos los archivos JSON y configura los eventos de los botones.
  
  async function cargarTodosLosPlatos() {
    try {
      const peticiones = archivosJSON.map(item => fetch(item.url));
      const respuestas = await Promise.all(peticiones);

      const datos = await Promise.all(respuestas.map(r => r.json()));

      // 1. Procesa y almacena los datos por categoría
      datos.forEach((dataObject, index) => {
          const key = archivosJSON[index].key;
          const productos = Object.values(dataObject)[0]; 
          productosPorCategoria[key] = productos; // Almacena la lista por su clave
      });
      
      // 2. Inicializa la vista por defecto: Carga la primera categoría ('productosPasta')
      filtrarProductos('productosPasta'); 

      // 3. Configura el Event Listener para los enlaces de filtro
      if (filtroContenedor) {
          filtroContenedor.addEventListener('click', (e) => {
              // Asegura que el clic fue en un enlace <a>
              const enlace = e.target.closest('a');
              if (enlace) {
                  // Previene el comportamiento por defecto de la ancla (saltar a la sección)
                  e.preventDefault(); 
                  
                  // Obtiene el texto del enlace (ej: "- Pasta -")
                  const textoBoton = enlace.textContent.trim().toLowerCase();
                  
                  // Mapea el texto del botón a la clave del JSON
                  let categoriaKey = '';
                  if (textoBoton.includes('pasta')) categoriaKey = 'productosPasta';
                  else if (textoBoton.includes('sandwich')) categoriaKey = 'productosSandwich';
                  else if (textoBoton.includes('especialidad')) categoriaKey = 'productosEspecialidad';
                  else if (textoBoton.includes('nuggets')) categoriaKey = 'productosNuggets';
                  else if (textoBoton.includes('ensalada')) categoriaKey = 'productosEnsalada';

                  if (categoriaKey) {
                      filtrarProductos(categoriaKey); // Llama a la función de filtrado
                  }
              }
          });
      }

    } catch (error) {
      console.error("Error crítico al cargar los archivos JSON:", error);
      contenedor.innerHTML = "<p style='color: red; padding: 20px; text-align: center;'>Error al cargar el menú</p>";
    }
  }


  //  INICIO DEL PROGRAMA

  // Activa el listener para el scroll de la ventana
  window.addEventListener("scroll", manejarScroll);
  
  // Inicia la carga de datos
  await cargarTodosLosPlatos();
});