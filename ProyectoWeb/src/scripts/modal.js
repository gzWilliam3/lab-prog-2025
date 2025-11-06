const cont = document.getElementById("modal");
const modal = document.querySelector(".modal-contenido");
//const botonCerrar = document.querySelector(".botonCerrar");

document.querySelectorAll(".producto").forEach(product => {
    /*product.addEventListener("click", () => {
        const id = parseInt(product.id);

        modal.innerHTML = `
            <div class="botonCerrar">
                <p>X</p>
              </div>
              <img class="fotoProducto" src="${product.imagen}}">
              <div class="nombreProducto">${product.nombre}</div>
              <div class="textoProducto">${product.descripcion}</div>
            </div>
        `;

        cont.style.display = "flex";
    })

    // Para que funcione el boton de cerrar
    botonCerrar.addEventListener("click", (e) => {
        cont.style.display = "none";
    })
    */
   product.addEventListener("click", () => {
    const nombre = product.dataset.nombre || "";
    const descripcion = product.dataset.descripcion || "";
    const imagen = product.dataset.imagen || "";

    modal.innerHTML = `
      <button class="botonCerrar" aria-label="Cerrar">×</button>
      <img class="fotoProducto" src="${imagen}" alt="${nombre}">
      <div class="nombreProducto">${nombre}</div>
      <div class="textoProducto">${descripcion}</div>
    `;

    // el botón ya existe ahora; lo selecciono y agrego su listener
    const botonCerrarNuevo = modal.querySelector(".botonCerrar");
    botonCerrarNuevo.addEventListener("click", () => {
      cont.style.display = "none";
    });

    cont.style.display = "flex";
  });
})


// Para que se salga del modal cuando se hace clic afuera de el
window.addEventListener("click", (e) => {
    if (e.target === cont){
        cont.style.display = "none";
    }
})