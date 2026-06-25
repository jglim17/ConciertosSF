alert("APP NUEVA");

async function cargarConciertos() {
    const proximos = document.getElementById("proximos");

    const respuesta = await fetch("data/conciertos.json");
    const conciertos = await respuesta.json();

    proximos.innerHTML = "";

    conciertos.forEach(concierto => {
        proximos.innerHTML += `
            <div class="concierto">
                <h3>${concierto.artista}</h3>
                <p>🕒 ${concierto.hora}</p>
                <p>📍 ${concierto.escenario}</p>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", cargarConciertos);