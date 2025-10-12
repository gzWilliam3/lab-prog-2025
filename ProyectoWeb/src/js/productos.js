cargarPasta();
cargarEspecialidad();
cargarSandwich();
cargarNuggets();
cargarEnsalada();

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
                            alt="${pasta.alt}"
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
                            alt="${especialidad.alt}"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
}

function cargarSandwich(){
    const contenedor = document.getElementById("grillaDeSandwich");
    fetch("./data/productosSandwich.json")
        .then(respuesta => respuesta.json())
        .then(arrSandwich => {
            contenedor.innerHTML = "";

            arrSandwich.productosSandwich.forEach(sandwich => {
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto")

                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${sandwich.nombre}</p>
                        <p class="descripcionProducto">${sandwich.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${sandwich.imagen}"
                            alt="${sandwich.alt}"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
}

function cargarNuggets(){
    const contenedor = document.getElementById("grillaDeNuggets");
    fetch("./data/productosNuggets.json")
        .then(respuesta => respuesta.json())
        .then(arrNuggets => {
            contenedor.innerHTML = "";

            arrNuggets.productosNuggets.forEach(nugget => {
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto")

                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${nugget.nombre}</p>
                        <p class="descripcionProducto">${nugget.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${nugget.imagen}"
                            alt="${nugget.alt}"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
}

function cargarEnsalada(){
    const contenedor = document.getElementById("grillaDeEnsalada");
    fetch("./data/productosEnsalada.json")
        .then(respuesta => respuesta.json())
        .then(arrEnsalada => {
            contenedor.innerHTML = "";

            arrEnsalada.productosEnsalada.forEach(ensalada => {
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto")

                divProducto.innerHTML = `
                    <div class="textoProducto">
                        <p class="nombreProducto">${ensalada.nombre}</p>
                        <p class="descripcionProducto">${ensalada.descripcion}</p>
                    </div>

                    <div class="contenedorFotoProducto">
                        <img
                            class="fotoProducto"
                            src="${ensalada.imagen}"
                            alt="${ensalada.alt}"
                        />
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });
        })
}

