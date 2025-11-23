// Carga la secccion del footer con un script

cargarFooter();

function cargarFooter(){
    const seccionFooter = document.getElementById("piePagina");
    if(!seccionFooter) return;

    seccionFooter.innerHTML = "";

    seccionFooter.innerHTML =  `
        <div class="logoFooter">
            <img src="/assets/logo/buenMorfar256_blanco.png" alt="Logo en blanco" />
        </div>

        <ul class="listadoFooter">
            <li>
                <a href="/">- Home -</a>
            </li>
            <li>
                <a href="#seccionNosotros">- Nosotros -</a>
            </li>
            <li>
                <a href="#seccionUbicacion">- Ubicacion -</a>
            </li>
            <li>
                <a href="/productos">- Productos -</a>
            </li>
        </ul>

        <div class="contactoFooter">
            <h4>- Diseño y desarrollo -</h4>

            <div class="containerUsers">
                <div class="devUser">
                    <img class="logoGitHub" src="/assets/icons/github.png" alt="Logo de GitHub">
                    <a href="https://github.com/gzWilliam3/lab-prog-2025">Repositorio del Grupo 16</a>
                </div>
                <div class="devUser">
                    <img class="logoGitHub" src="/assets/icons/github.png" alt="Logo de GitHub">
                    <a href="https://github.com/francisconunez-PG">Francisco Nuñez Ardanaz</a>
                </div>
                <div class="devUser">
                    <img class="logoGitHub" src="/assets/icons/github.png" alt="Logo de GitHub">
                    <a href="https://github.com/tsantiagogonzalez">Tomas Santiago Gonzalez</a>
                </div>
                <div class="devUser">
                    <img class="logoGitHub" src="/assets/icons/github.png" alt="Logo de GitHub">
                    <a href="https://github.com/gzWilliam3">William Agustin Gonzalez</a>
                </div>
            </div>
        </div>
    `;
}