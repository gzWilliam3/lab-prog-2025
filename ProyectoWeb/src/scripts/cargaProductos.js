// Variables globales.
const contenedor = document.querySelector(".listaProductos");
let datosCompletos = {};
let productos = [];
let indice = 0;
const cantidadPorCarga = 2;
let cargando = false;

window.votarPlato = votarPlato; // Necesario porque el Onclick.


// Inicializa sistema.
document.addEventListener("DOMContentLoaded", () => {
    if (!contenedor) return;

    fetch("/api/datosProductos")
        .then(res => res.json())
        .then(datos => {
            datosCompletos = datos;
            configurarMenuNav();
            filtrarYMostrar("todosProductos");
            window.addEventListener("scroll", cargarMasAlScroll);
        })
        .catch(err => console.error("Error al cargar datos:", err));
});

// Configura menú de categorías.
function configurarMenuNav() {
    const items = document.querySelectorAll(".navContenedorComidas .listado a");

    items.forEach(el => {
        el.addEventListener("click", e => {
            e.preventDefault();
            filtrarYMostrar(el.dataset.categoria);
        });
    });
}

// Filtra productos.
function filtrarYMostrar(categoria) {
    let lista = [];

    if (categoria === "todosProductos") {
        //el flat combina todas las categorías.
        lista = Object.values(datosCompletos).flat();
    } else {
        lista = datosCompletos[categoria] || [];
    }

    productos = lista;
    contenedor.innerHTML = "";
    indice = 0;
    cargando = false;

    return cargarProductos();
}

// Carga productos en tandas (en cantidadPorCarga).
function cargarProductos() {
    let puede = true;

    if (cargando) puede = false;
    if (indice >= productos.length) puede = false;

    if (!puede){

        cargando = true;
        const fragmento = document.createDocumentFragment();
        const fin = Math.min(indice + cantidadPorCarga, productos.length);

        // Se usa un fragmento para evitar reflow múltiples.
        for (let i = indice; i < fin; i++) {
            const nodo = crearProducto(productos[i]);
            fragmento.appendChild(nodo);

            // Delay de animación
            setTimeout(() => nodo.classList.add("visible"), 100 * (i - indice));
        }

        contenedor.appendChild(fragmento);
        indice = fin;
        cargando = false;
    }
    return puede;
}

// Crea la tarjeta visual de un producto.
function crearProducto(plato) {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
        <div class="contenedorFotoProducto">
            <img class="fotoProducto" src="${plato.imagen}" alt="Imagen de ${plato.nombre}">
        </div>

        <div class="infoProducto">
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>

            <button class="btnVotar" data-id="${plato.id}">Votar</button>
            <button class="btnComentarios" data-id="${plato.id}">Comentarios</button>
        </div>
    `;

    div.querySelector(".btnVotar").addEventListener("click", () => votarPlato(plato.id));
    div.querySelector(".btnComentarios").addEventListener("click", () => abrirModalComentarios(plato.id));

    return div;
}

// Scroll infinito.
function cargarMasAlScroll() {
    const cercaDelFinal =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

    if (cercaDelFinal) cargarProductos();

    return true;
}

// Maneja votos.
async function votarPlato(id) {
    let mensaje = "Error al registrar el voto.";

    try {
        const res = await fetch("/api/votos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ platoId: id })
        });

        const data = await res.json();
        mensaje = data.mensaje || mensaje;
    } catch (e) {
        console.error("Error votando:", e);
    }

    mostrarMensajeVoto(mensaje);
    return true;
}

// Muestra confirmación de voto.
function mostrarMensajeVoto(texto) {
    const div = document.createElement("div");
    div.classList.add("mensajeVoto");
    div.textContent = texto;

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);

    return true;
}

// Elementos del modal(Formato Comentario).
const modal = document.getElementById("modalComentarios");
const cerrarModal = document.querySelector(".cerrarModal");
const listaComentariosDiv = document.getElementById("listaComentarios");
const nombreEntrada = document.getElementById("nombreComentario");
const comentarioEntrada = document.getElementById("textoComentario");
const btnEnviarComentario = document.getElementById("btnEnviarComentario");

let comentarioProductoActual = null;

// Abre los comentarios.
function abrirModalComentarios(id) {
    comentarioProductoActual = id;
    modal.classList.remove("hidden");
    cargarComentarios(id);
    return true;
}

// Cierra los comentarios.
cerrarModal.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
});

// Carga comentarios del producto.
async function cargarComentarios(id) {
    listaComentariosDiv.innerHTML = "Cargando...";

    const res = await fetch(`/api/comentarios/${id}`);
    const lista = await res.json();

    // Importante: pintar en bloque, evita múltiples repaints.
    listaComentariosDiv.innerHTML =
        lista.length === 0
            ? "<em>No hay comentarios aún.</em>"
            : lista
                .map(c => `
                    <div>
                        <strong>${c.nombre}</strong><br>
                        ${c.comentario}<br>
                        <small>${new Date(c.fecha).toLocaleString()}</small>
                    </div>
                `)
                .join("");

    return true;
}

// Envia Comentario.
btnEnviarComentario.addEventListener("click", async () => {
    const nombre = nombreEntrada.value.trim();
    const texto = comentarioEntrada.value.trim();

    if (!nombre || !texto) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(`/api/comentarios/${comentarioProductoActual}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, comentario: texto })
    });

    comentarioEntrada.value = "";
    cargarComentarios(comentarioProductoActual);
});

