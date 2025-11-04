
const contenedor = document.querySelector(".listaProductos");
let platos = [];
let indice = 0;
const cantidadPorCarga = 4;
let categoriaActual = null;
let cargando = false;

// Exportar la funcion votarPlato para que sea global.Permite trabajar con platosemanal.
window.votarPlato = votarPlato;

// Usen asi por ahora.
  window.datosProductos = {
    productosPasta: [
      { id: 1, nombre: "Pasta con Queso", descripcion: "Pasta italiana con salsa cremosa de queso parmesano.", imagen: "../assets/comida/pasta/pastaQueso.jpeg" },
      { id: 2, nombre: "Pasta y Verduras", descripcion: "Tallarines salteados con vegetales frescos y aceite de oliva.", imagen: "../assets/comida/pasta/pasta&verduras.jpg" },
      { id: 3, nombre: "Pasta con Albóndigas", descripcion: "Spaghetti clásico con albóndigas y salsa de tomate casera.", imagen: "../assets/comida/pasta/pastaAlbondigas.jpeg" },
      { id: 4, nombre: "Fettuccine Alfredo", descripcion: "Fettuccine en salsa Alfredo cremosa con parmesano y manteca.", imagen: "../assets/comida/pasta/fettuccineAlfredo.png" },
      { id: 5, nombre: "Ravioles de Ricotta y Espinaca", descripcion: "Ravioles artesanales servidos con salsa de tomate y albahaca.", imagen: "../assets/comida/pasta/raviolesRicotaEspinaca.png" }
    ],
    productosEspecialidad: [

      { id: 6, nombre: "Hamburguesa 'Buen Morfar'", descripcion: "Carne premium, pan brioche y salsa casera especial.", imagen: "../assets/comida/especialidad/hamburguesa.jpg" },
      { id: 7, nombre: "Pollo 'A la Morfar' & Papas Rústicas", descripcion: "Muslo grillado con condimentos secretos y papas rústicas.", imagen: "../assets/comida/especialidad/polloPapas.jpg" },
      { id: 8, nombre: "Lomo a la Parrilla", descripcion: "Lomo tierno con chimichurri artesanal y guarnición a elección.", imagen: "../assets/comida/especialidad/lomoParrilla.png" }
    ],
    productosSandwich: [
      { id: 9, nombre: "Sandwich de Carne BBQ", descripcion: "Carne tierna a la barbacoa con cebolla caramelizada.", imagen: "../assets/comida/sandwich/sandwichCarneBarbacoa.jpg" },
      { id: 10, nombre: "Sandwich de Pollo", descripcion: "Pechuga grillada con lechuga, tomate y mayonesa casera.", imagen: "../assets/comida/sandwich/sandwichPollo.jpg" },
      { id: 11, nombre: "Sandwich de Pollo & Papas", descripcion: "Sandwich de pollo acompañado de papas fritas crocantes.", imagen: "../assets/comida/sandwich/sandwichPolloPapas.jpg" },
      { id: 12, nombre: "Sandwich de Pollo & Queso", descripcion: "Sandwich de pollo con queso.", imagen: "../assets/comida/sandwich/sandwichPolloQueso.jpeg" },
      { id: 13, nombre: "Sandwich de Soja BBQ", descripcion: "Versión vegetariana con soja barbacoa y vegetales grillados.", imagen: "../assets/comida/sandwich/sandwichSojaBarbacoa.jpeg" }
    ],
    productosNuggets: [
      { id: 14, nombre: "Nuggets de Pollo", descripcion: "Crujientes por fuera, tiernos por dentro, con salsa barbacoa.", imagen: "../assets/comida/nuggets/nuggetsPollo.jpeg" },
      { id: 15, nombre: "Nuggets de Verdura", descripcion: "Deliciosos bocados de zanahoria, calabaza y arvejas.", imagen: "../assets/comida/nuggets/nuggetsVerdura.jpeg" },
      { id: 16, nombre: "Nuggets de Queso", descripcion: "Nuggets rellenos de queso fundido, ideales como snack.", imagen: "../assets/comida/nuggets/nuggetsQueso.png" }
    ],
    productosEnsalada: [
      { id: 17, nombre: "Ensalada Verde", descripcion: "Mix de hojas verdes, pepino y aderezo de limón.", imagen: "../assets/comida/ensaladas/ensalada2.jpeg" },
      { id: 18, nombre: "Ensalada César", descripcion: "Clásica con pollo grillado, parmesano y crutones.", imagen: "../assets/comida/ensaladas/ensaladaCesar.png" },
      { id: 19, nombre: "Ensalada Mediterránea", descripcion: "Con tomate, aceitunas, queso feta y aceite de oliva.", imagen: "../assets/comida/ensaladas/ensaladaMedi.png" },
      { id: 20, nombre: "Ensalada de Champiñones", descripcion: "Champiñones frescos con espinaca y vinagreta balsámica.", imagen: "../assets/comida/ensaladas/ensalada1.jpeg" }
    ],
  };

document.addEventListener("DOMContentLoaded", () => {
  if (contenedor) {
    cargarTodosLosPlatos();
    window.addEventListener("scroll", cargarMasAlScroll);
  }
});

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

// Cargar los datos.
function cargarTodosLosPlatos() {
  try {
    // Une todos los productos en un solo array.
    platos = Object.values(window.datosProductos).flat(); // instantaneo...

    mostrarMasPlatos();
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

  // Cargado dinamico de platos a medida que se hace scroll
  function mostrarMasPlatos() {
    if (cargando) return;
    cargando = true;
    const fragment = document.createDocumentFragment();
    let tituloCategoria = null;

    for (let i = 0; i < cantidadPorCarga && indice < platos.length; i++, indice++) {
      const producto = platos[indice];
      
      // añade el encabezado de la categoría.
      let categoriaKey = Object.keys(window.datosProductos).find(key => window.datosProductos[key].includes(producto));
      
      if (categoriaKey !== categoriaActual) {
          categoriaActual = categoriaKey;
          
          let idAnclaje = "";
          let titulo = "";

          //Mapea la key del plato a su tipo/titulo.
          switch(categoriaKey) {
              case 'productosPasta':
                  idAnclaje = "linkPasta";
                  titulo = "Pasta";
                  break;
              case 'productosEspecialidad':
                  idAnclaje = "linkEspecialidad";
                  titulo = "Especialidades";
                  break;
              case 'productosSandwich':
                  idAnclaje = "linkSandwich";
                  titulo = "Sandwiches";
                  break;
              case 'productosNuggets':
                  idAnclaje = "linkNuggets";
                  titulo = "Nuggets";
                  break;
              case 'productosEnsalada':
                  idAnclaje = "linkEnsalada";
                  titulo = "Ensaladas";
                  break;
              default:
                  titulo = "Otros";
                  idAnclaje = "";
          }

          tituloCategoria = document.createElement("h2");
          tituloCategoria.textContent = `- ${titulo} -`;
          tituloCategoria.classList.add("tituloCategoria");
          if (idAnclaje) {
            tituloCategoria.id = idAnclaje; // Asigna el ID para el scroll.
          }
          fragment.appendChild(tituloCategoria);
      }
      
      const eltoProducto = crearProducto(producto);
      fragment.appendChild(eltoProducto);
      setTimeout(() => eltoProducto.classList.add("visible"), 50 * i);
    }

    contenedor.appendChild(fragment);
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
        <button class="btnVotar" onclick="votarPlato(${plato.id})">Votar</button>
      </div>
    `;
    return producto;
  }

  function cargarMasAlScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      mostrarMasPlatos();
    }
  }