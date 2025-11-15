// Rutas de API específicas.
const ruta_pasta = "/api/productos/pasta";
const ruta_especialidad = "/api/productos/especialidad";
const ruta_sandwich = "/api/productos/sandwich";
const ruta_nuggets = "/api/productos/nuggets";
const ruta_ensalada = "/api/productos/ensalada";

// Llama a las funciones al cargar la página.
cargarPasta();
cargarEspecialidad();
cargarSandwich();
cargarNuggets();
cargarEnsalada();

// Función auxiliar para manejar la lógica de fetch y renderizado.
function cargarCategoria(urlApi, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    
    // Se hace la llamada al endpoint específico.
    fetch(urlApi)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}: Falló el endpoint ${urlApi}`);
            }
            // El servidor devuelve el array de productos.
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
            contenedor.innerHTML = `<p>Error: No se pudo cargar esta categoría. (${error.message})</p>`;
        });
}


// Implementaciones usando la función auxiliar:
function cargarPasta() {
    cargarCategoria(ruta_pasta, "grillaDePasta");
}

function cargarEspecialidad() {
    cargarCategoria(ruta_especialidad, "grillaDeEspecialidad");
}

function cargarSandwich() {
    cargarCategoria(ruta_sandwich, "grillaDeSandwich");
}

function cargarNuggets() {
    cargarCategoria(ruta_nuggets, "grillaDeNuggets");
}

function cargarEnsalada() {
    cargarCategoria(ruta_ensalada, "grillaDeEnsalada");
}