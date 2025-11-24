

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // obtencion de votos.
    const votosResponse = await fetch("/api/votos"); 
    if (!votosResponse.ok) {
      throw new Error("No se pudieron obtener los votos del servidor.");
    }
    const votos = await votosResponse.json(); 
    
    // Se convierte el objeto de votos a un array para poder ordenarlo.
    const listaPlatos = Object.entries(votos);

    if (listaPlatos.length === 0) {
      console.log("Aún no hay votos para mostrar el ranking.");
      return;
    }

    //  Tira el top 5 de mejores platos.
    const topPlatos = listaPlatos.sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Obtiene los detalles de los platos(votos nomas, supongo).
    const datosResponse = await fetch("/api/datosProductos");
    if (!datosResponse.ok) {
      throw new Error("No se pudieron obtener los datos de los productos.");
    }
    const datos = await datosResponse.json();
    
    // Une todos los productos de las diferentes categorías en un solo array.
    const todosPlatos = Object.values(datos).flat();
    const contenedor = document.querySelector(".containerComidas");

    if (!contenedor) return;

    contenedor.innerHTML = ""; // limpiar antes de mostrar.

    // Muestra los platos rankeados.
    topPlatos.forEach(([id, votos], index) => {
      // Buscar el plato completo usando su ID.
      const plato = todosPlatos.find((p) => p.id == id);
      if (!plato) return;

      const elto = document.createElement("div");
      elto.classList.add("eltoComida");

      elto.innerHTML = `
        <div class="platoRanking">
          <img src="${plato.imagen || "/assets/default.jpg"}"
              alt="Imagen de ${plato.nombre || "Plato destacado"}"
              title="${plato.nombre || "Plato destacado"}: ${votos} votos">

          <div class="overlayInfo">
            <span class="rankingEtiqueta">#${index + 1}</span>
            <p class="nombrePlato">${plato.nombre || "Plato destacado"}</p>
          </div>
        </div>
      `;

      contenedor.appendChild(elto);
    });

  } catch (error) {
    console.error("Error al cargar el ranking semanal:", error);
    const contenedor = document.querySelector(".containerComidas");
    if(contenedor) {
        contenedor.innerHTML = `<p style="text-align:center;">Error: No se pudo cargar el ranking global.</p>`;
    }
  }
});