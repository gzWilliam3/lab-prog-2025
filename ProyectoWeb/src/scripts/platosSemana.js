document.addEventListener("DOMContentLoaded", async () => {
  try {
    // OBTIENE los votos del servidor.
    const votosResponse = await fetch("/api/getVotos");
    if (!votosResponse.ok) {
      throw new Error("No se pudieron obtener los votos del servidor.");
    }
    const votos = await votosResponse.json(); 
    
    const listaPlatos = Object.entries(votos);

    if (listaPlatos.length === 0) {
      console.log("Aún no hay votos para mostrar el ranking.");
      return;
    }

    // Seleciona los 5 mejores platos.
    const topPlatos = listaPlatos.sort((a, b) => b[1] - a[1]).slice(0, 5);

    // OBTIENE detalles de los platos. 
    const datosResponse = await fetch("/api/getDatosProductos");
    if (!datosResponse.ok) {
      throw new Error("No se pudieron obtener los datos de los productos.");
    }
    const datos = await datosResponse.json();
    
    const todosPlatos = Object.values(datos).flat();
    const contenedor = document.querySelector(".containerComidas");

    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    // MUESTRA los platos en el ranking (Index.html).
    topPlatos.forEach(([id, votos], index) => {
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
