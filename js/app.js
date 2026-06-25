const objetivo = new Date("2026-07-06T12:00:00");

function actualizarCuentaAtras() {
    const ahora = new Date();
    const diferencia = objetivo - ahora;

    const contador = document.getElementById("cuenta-atras");

    if (diferencia <= 0) {
        contador.innerHTML =
`⏳ Faltan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    contador.innerHTML =
        `⏳ ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

actualizarCuentaAtras();
setInterval(actualizarCuentaAtras, 1000);

async function cargarConciertos() {
    try {
        const respuesta = await fetch("data/conciertos.json");
        const conciertos = await respuesta.json();

        console.log(conciertos);
    } catch (error) {
        console.error("Error cargando conciertos:", error);
    }
}

cargarConciertos();