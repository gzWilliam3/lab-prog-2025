cargarPasta();
cargarEspecialidad();

function cargarPasta(){
    // Creo variable contenedor con el elemento del HTML que contiene los elementos repetibles
    const contenedor = document.getElementById("grillaDePasta");

    // Traigo datos en crudo del archivo JSON
    fetch("./data/productosPasta.json")
        .then(respuesta => respuesta.json())

        // Los datos cargados en JSON se van a arrPasta
        .then(arrPasta => {
            // Limpio contenedor por si las dudas
            contenedor.innerHTML = "";

            // Para cada elemento productosPasta de arrPasta se crea el divProducto
            arrPasta.productosPasta.forEach(pasta => {
                const divProducto = document.createElement("div"); // Indico que creo un div
                divProducto.classList.add("producto"); // Para estilarlo con el codigo de CSS de producto

                // Codigo de lo que tendra adentro el divProducto (copie y pegue lo que ya teniamos)
                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${pasta.nombre}</p>
                        <p class="descripcionProducto">${pasta.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${pasta.imagen}"
                            alt="Imagen de pasta con queso"
                        />
                    </div>
                `;

                // Integro el contenedor creado en la pagina.
                contenedor.appendChild(divProducto);
            });
        })
}

function cargarEspecialidad(){
    const contenedor = document.getElementById("grillaDeEspecialidad");
    fetch("./data/productosEspecialidad.json")
        .then(respuesta => respuesta.json())
        .then(arrEspecialidad => {
            contenedor.innerHTML = "";

            arrEspecialidad.productosEspecialidad.forEach(especialidad => {
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto")

                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${especialidad.nombre}</p>
                        <p class="descripcionProducto">${especialidad.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${especialidad.imagen}"
                            alt="Imagen de pasta con queso"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
}

function cargarSandwich(){
    let arrSandwich;
    fetch("./data/productosSandwich.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            arrSandwich = datos;
            console.log(arrSandwich);
        })
}

function cargarNuggets(){
    let arrNuggets;
    fetch("./data/productosNuggets.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            arrNuggets = datos;
            console.log(arrNuggets);
        })
}

function cargarEnsalada(){
    let arrEnsalada;
    fetch("./data/productosEnsalada.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            arrEnsalada = datos;
            console.log(arrEnsalada);
        })
}

