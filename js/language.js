let idioma = localStorage.getItem("idioma") || "es";
let textos = {};

// Carga el archivo JSON del idioma
async function cargarIdioma() {

    const respuesta = await fetch(`lang/${idioma}.json`);
    textos = await respuesta.json();

    aplicarIdioma();
    actualizarSelectorIdiomas();

}

// Cambia el idioma
async function cambiarIdioma(nuevoIdioma) {

    idioma = nuevoIdioma;

    localStorage.setItem("idioma", idioma);

    await cargarIdioma();

    // Volver a pintar los eventos con el nuevo idioma
    pintarEventos();

}

// Aplica los textos al HTML
function aplicarIdioma() {

    document.getElementById("app-title").textContent = textos.app.title;
    document.getElementById("app-subtitle").textContent = textos.app.subtitle;

    document.getElementById("menu-today").innerHTML = "🏠 " + textos.menu.today;
    document.getElementById("menu-explore").innerHTML = "🔍 " + textos.menu.explore;
    document.getElementById("menu-favorites").innerHTML = "⭐ " + textos.menu.favorites;

    document.getElementById("section-now").innerHTML = "🔴 " + textos.sections.now;
    document.getElementById("section-events").innerHTML = "⏭️ " + textos.sections.events;

}

// Oculta el idioma seleccionado
function actualizarSelectorIdiomas() {

    ["es", "eu", "en", "fr"].forEach(codigo => {

        const enlace = document.getElementById("lang-" + codigo);

        if (codigo === idioma) {
            enlace.style.display = "none";
        } else {
            enlace.style.display = "inline";
        }

    });

}

// Cargar el idioma al abrir la página
document.addEventListener("DOMContentLoaded", cargarIdioma);
