

// Usen asi por ahora.
  window.datosProductos = {
    productosPasta: [

      { id: 1, nombre: "Pasta con Queso", descripcion: "Pasta italiana con salsa cremosa de queso parmesano.", imagen: "../assets/comida/pasta/pastaQueso.jpeg" },
      { id: 2, nombre: "Pasta y Verduras", descripcion: "Tallarines salteados con vegetales frescos y aceite de oliva.", imagen: "../assets/comida/pasta/pasta&verduras.jpg" },
      { id: 3, nombre: "Pasta con Albóndigas", descripcion: "Spaghetti clásico con albóndigas y salsa de tomate casera.", imagen: "../assets/comida/pasta/pastaAlbondigas.jpeg" },
      { id: 4, nombre: "Fettuccine Alfredo", descripcion: "Fettuccine en salsa Alfredo cremosa con parmesano y manteca.", imagen: "../assets/comida/pasta/fettuccineAlfredo.jpg" },
      { id: 5, nombre: "Ravioles de Ricotta y Espinaca", descripcion: "Ravioles artesanales servidos con salsa de tomate y albahaca.", imagen: "../assets/comida/pasta/raviolesRicotta.jpg" }

    ],
    productosSandwich: [
      { id: 9, nombre: "Sandwich de Carne BBQ", descripcion: "Carne tierna a la barbacoa con cebolla caramelizada.", imagen: "../assets/comida/sandwich/sandwichCarneBarbacoa.jpg" },
      { id: 10, nombre: "Sandwich de Pollo", descripcion: "Pechuga grillada con lechuga, tomate y mayonesa casera.", imagen: "../assets/comida/sandwich/sandwichPollo.jpg" },
      { id: 11, nombre: "Sandwich de Pollo & Papas", descripcion: "Sandwich de pollo acompañado de papas fritas crocantes.", imagen: "../assets/comida/sandwich/sandwichPolloPapas.jpg" },
      { id: 12, nombre: "Sandwich de Soja BBQ", descripcion: "Versión vegetariana con soja barbacoa y vegetales grillados.", imagen: "../assets/comida/sandwich/sandwichSojaBarbacoa.jpeg" }
    ],
    productosEspecialidad: [

      { id: 6, nombre: "Hamburguesa 'Buen Morfar'", descripcion: "Carne premium, pan brioche y salsa casera especial.", imagen: "../assets/comida/especialidad/hamburguesa.jpg" },
      { id: 7, nombre: "Pollo 'A la Morfar' & Papas Rústicas", descripcion: "Muslo grillado con condimentos secretos y papas rústicas.", imagen: "../assets/comida/especialidad/polloPapas.jpg" },
      { id: 8, nombre: "Lomo a la Parrilla", descripcion: "Lomo tierno con chimichurri artesanal y guarnición a elección.", imagen: "../assets/comida/especialidad/lomoParrilla.jpg" }
    ],
    productosNuggets: [
      { id: 13, nombre: "Nuggets de Pollo", descripcion: "Crujientes por fuera, tiernos por dentro, con salsa barbacoa.", imagen: "../assets/comida/nuggets/nuggetsPollo.jpeg" },
      { id: 14, nombre: "Nuggets de Verdura", descripcion: "Deliciosos bocados de zanahoria, calabaza y arvejas.", imagen: "../assets/comida/nuggets/nuggetsVerdura.jpeg" },
      { id: 15, nombre: "Nuggets de Queso", descripcion: "Nuggets rellenos de queso fundido, ideales como snack.", imagen: "../assets/comida/nuggets/nuggetsQueso.jpg" }
    ],
    productosEnsalada: [
      { id: 16, nombre: "Ensalada Verde", descripcion: "Mix de hojas verdes, pepino y aderezo de limón.", imagen: "../assets/comida/ensaladas/ensalada2.jpeg" },
      { id: 17, nombre: "Ensalada César", descripcion: "Clásica con pollo grillado, parmesano y crutones.", imagen: "../assets/comida/ensaladas/ensaladaCesar.jpg" },
      { id: 18, nombre: "Ensalada Mediterránea", descripcion: "Con tomate, aceitunas, queso feta y aceite de oliva.", imagen: "../assets/comida/ensaladas/ensaladaMediterranea.jpg" },
      { id: 19, nombre: "Ensalada de Champiñones", descripcion: "Champiñones frescos con espinaca y vinagreta balsámica.", imagen: "../assets/comida/ensaladas/ensalada1.jpeg" }

    ],
  };

document.addEventListener("DOMContentLoaded", () => {
  
  const contenedor = document.querySelector(".listaProductos");
  if (!contenedor) return; // evita errores si no está en index.html.

  const platos = Object.values(window.datosProductos).flat();  
  let indice = 0;
  const cantidadPorCarga = 2; // cantidad de platos por tanda.
  let cargando = false;

  // Crea el HTML de cada producto.
  function crearProducto(plato) {
  const producto = document.createElement("article");
  producto.classList.add("producto");
  producto.setAttribute("aria-label", plato.nombre);

  producto.innerHTML = `
    <div class="textoProducto">
      <h3 class="nombreProducto">${plato.nombre}</h3>
      <p class="descripcionProducto">${plato.descripcion}</p>
      <button class="btnVotar">Votar</button>
    </div>
    <figure class="contenedorFotoProducto">
      <img class="fotoProducto" src="${plato.imagen}" alt="Imagen de ${plato.nombre}">
    </figure>
  `;

  // Evento de voto.
  producto.querySelector(".btnVotar").addEventListener("click", (e) => {
    e.stopPropagation();
    votarPlato(plato.id);
  });

  return producto;
}


function votarPlato(id) {
  // Traer votos guardados.
  const votos = JSON.parse(localStorage.getItem("votosPlatos")) || {};

  votos[id] = (votos[id] || 0) + 1;

  // Guarda votos
  localStorage.setItem("votosPlatos", JSON.stringify(votos));

  const aviso = document.createElement("div");
  aviso.textContent = "¡Gracias por tu voto!";
  aviso.classList.add("mensajeVoto");
  document.body.appendChild(aviso);
  setTimeout(() => aviso.remove(), 1500);
}

  // Cargar todos los datos embebidos.
  function cargarTodosLosPlatos() {
    try {
      // Une todos los productos en un solo array.
      platos = Object.values(datosProductos).flat();

      mostrarMasPlatos();
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  // Muestra más platos (por tandas).
  function mostrarMasPlatos() {
    if (cargando) return;
    cargando = true;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cantidadPorCarga && indice < platos.length; i++, indice++) {
      const producto = crearProducto(platos[indice]);
      fragment.appendChild(producto);
      setTimeout(() => producto.classList.add("visible"), 50 * i);
    }

    contenedor.appendChild(fragment);
    cargando = false;
  }

  // Detectar scroll al final.
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      mostrarMasPlatos();
    }
  });

  // Inicializar.
  mostrarMasPlatos();

});
