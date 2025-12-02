// Inicializa.
document.addEventListener("DOMContentLoaded", async () => {

  let ok = true;
  const contenedor = document.querySelector(".containerComidas");

  if (!contenedor) ok = false;

  let topPlatos = [];
  let todosPlatos = [];

  try {
    // Obtiene votos.
    if (ok) {
      const resVotos = await fetch("/api/votos");
      if (!resVotos.ok) ok = false;

      if (ok) {
        const votos = await resVotos.json();
        const lista = Object.entries(votos);

        if (lista.length === 0) ok = false;
        else {
          topPlatos = lista
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // top 5
        }
      }
    }

    // Obtiene productos.
    if (ok) {
      const resDatos = await fetch("/api/datosProductos");
      if (!resDatos.ok) ok = false;

      if (ok) {
        const datos = await resDatos.json();
        todosPlatos = Object.values(datos).flat();
      }
    }

    // Renderiza ranking.
    if (ok) {
      contenedor.innerHTML = "";

      topPlatos.forEach(([id, votos], index) => {
        const plato = todosPlatos.find(p => p.id == id);

        // Si el plato no existe simplemente se salta.
        if (plato) {
          
          const div = document.createElement("div");
          div.classList.add("eltoComida");

          div.innerHTML = `
            <div class="platoRanking">
              <img src="${plato.imagen || "/assets/default.jpg"}"
                alt="Imagen de ${plato.nombre}">
              <div class="overlayInfo">
                <span class="rankingEtiqueta">#${index + 1}</span>
                <p class="nombrePlato">${plato.nombre}</p>
              </div>
            </div>
          `;

          contenedor.appendChild(div);
        }
      });
    }

  } catch (e) {
    console.error("Error:", e);
    ok = false;
    if (contenedor) {
    contenedor.innerHTML = `
      <p style="text-align:center;">
        Error: No se pudo cargar el ranking semanal.
      </p>`;
    }
  }


  return ok;
});
