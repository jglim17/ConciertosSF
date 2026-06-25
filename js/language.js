let idioma = localStorage.getItem("idioma") || "es";
let textos = {};

async function cargarIdioma() {

    const respuesta = await fetch(`lang/${idioma}.json`);
    textos = await respuesta.json();

    aplicarIdioma();
    actualizarSelectorIdiomas();

}

async function cambiarIdioma(nuevoIdioma) {

    idioma = nuevoIdioma;

    localStorage.setItem("idioma", idioma);

    await cargarIdioma();

    // Redibujar los eventos con el nuevo idioma
    if (typeof pintarEventos === "function") {
        pintarEventos();
    }

}

function obtenerTexto(ruta) {

    return ruta.split(".").reduce((obj, clave) => obj?.[clave], textos);

}

function aplicarIdioma() {

    document.getElementById("app-title").textContent = textos.app.title;

    document.getElementById("menu-today").innerHTML =
        "🏠 " + textos.menu.today;

    document.getElementById("menu-explore").innerHTML =
        "🔍 " + textos.menu.explore;

    document.getElementById("menu-favorites").innerHTML =
        "⭐ " + textos.menu.favorites;

    document.getElementById("section-now").innerHTML =
        "🔴 " + textos.sections.now;

    document.getElementById("section-events").innerHTML =
        "⏭️ " + textos.sections.events;

}

function actualizarSelectorIdiomas() {

    ["es", "eu", "en", "fr"].forEach(codigo => {

        const enlace = document.getElementById("lang-" + codigo);

        enlace.style.display = (codigo === idioma)
            ? "none"
            : "inline";

    });

}
