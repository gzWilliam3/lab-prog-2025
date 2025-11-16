//Formato SCREAMING_SNAKE_CASE.
const RUTA_PASTA = "/api/productos/pasta";
const RUTA_ESPECIALIDAD = "/api/productos/especialidad";
const RUTA_SANDWICH = "/api/productos/sandwich";
const RUTA_NUGGETS = "/api/productos/nuggets";
const RUTA_ENSALADA = "/api/productos/ensalada";

cargarPasta();
cargarEspecialidad();
cargarSandwich();
cargarNuggets();
cargarEnsalada();

function cargarCategoria(urlApi, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    
    fetch(urlApi)
        .then(res => {
            if (!res.ok) {
                // Esto atrapa un error 404 del servidor si la ruta no existe.
                throw new Error(`Error ${res.status} al acceder a ${urlApi}`);
            }
            return res.json(); 
        })
        .then(arrProductos => {
            contenedor.innerHTML = "";
            
            arrProductos.forEach(plato => {
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto");

                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${plato.nombre}</p>
                        <p class="descripcionProducto">${plato.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${plato.imagen}"
                            alt="${plato.nombre}"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
        .catch(error => {
            console.error(`Error al cargar ${idContenedor}:`, error);
            contenedor.innerHTML = `<p>Error al cargar el menú: No se pudo conectar con el servidor o la ruta falló.</p>`;
        });
}


function cargarPasta() {
    cargarCategoria(RUTA_PASTA, "grillaDePasta");
}

function cargarEspecialidad() {
    cargarCategoria(RUTA_ESPECIALIDAD, "grillaDeEspecialidad");
}

function cargarSandwich() {
    cargarCategoria(RUTA_SANDWICH, "grillaDeSandwich");
}

function cargarNuggets() {
    cargarCategoria(RUTA_NUGGETS, "grillaDeNuggets");
}

function cargarEnsalada() {
    cargarCategoria(RUTA_ENSALADA, "grillaDeEnsalada");
}