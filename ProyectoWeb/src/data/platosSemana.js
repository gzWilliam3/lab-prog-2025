// platosSemana.js
document.addEventListener("DOMContentLoaded", () => {
  const votos = JSON.parse(localStorage.getItem("votosPlatos")) || {};
  const listaPlatos = Object.entries(votos);

  if (listaPlatos.length === 0) return; // nadie votó todavía

  // Tomar los 5 más votados
  const topPlatos = listaPlatos
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const datos = window.datosProductos;
  if (!datos) {
    console.warn("No se encontraron datos de productos en window.datosProductos");
    return;
  }

  const todosPlatos = Object.values(datos).flat();
  const contenedor = document.querySelector(".containerComidas");

  if (!contenedor) {
    console.warn("No se encontró el contenedor .containerComidas");
    return;
  }

  contenedor.innerHTML = ""; // limpiar antes de mostrar

  topPlatos.forEach(([id, votos], index) => {
    const plato = todosPlatos.find(p => p.id == id);
    if (!plato) return;

    const elto = document.createElement("div");
    elto.classList.add("eltoComida");

    elto.innerHTML = `
      <div class="platoRanking">
        <img src="${plato.imagen || '../assets/default.jpg'}" 
             alt="Imagen de ${plato.nombre || 'Plato destacado'}" 
             title="${plato.nombre || 'Plato destacado'}">

        <div class="overlayInfo">
          <span class="rankingEtiqueta">#${index + 1}</span>
          <p class="nombrePlato">${plato.nombre || 'Plato destacado'}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(elto);
  });
});

