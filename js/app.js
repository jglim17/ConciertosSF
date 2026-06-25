async function cargarConciertos() {
    const proximos = document.getElementById("proximos");

    try {
        const respuesta = await fetch("data/conciertos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar conciertos.json");
        }

        const conciertos = await respuesta.json();

        console.log(conciertos[0]);
        alert(JSON.stringify(conciertos[0]));

        proximos.innerHTML = "";

        // Agrupar por día
        const grupos = {};

        conciertos.forEach(concierto => {
            if (!grupos[concierto.dia]) {
                grupos[concierto.dia] = [];
            }

            grupos[concierto.dia].push(concierto);
        });

        // Mostrar cada día
        Object.keys(grupos)
            .sort((a, b) => a - b)
            .forEach(dia => {

                const tituloDia = document.createElement("h2");
                tituloDia.textContent = `📅 ${dia} de julio`;
                tituloDia.style.marginTop = "30px";

                proximos.appendChild(tituloDia);

                grupos[dia].forEach(concierto => {

                    const tarjeta = document.createElement("div");
                    tarjeta.className = "concierto";

                    tarjeta.innerHTML = `
                        <h3>${concierto.titulo}</h3>
                        <p>🕒 ${concierto.hora}</p>
                        <p>📍 ${obtenerLugar(concierto.lugar)}</p>
                    `;

                    proximos.appendChild(tarjeta);

                });

            });

    } catch (error) {
        console.error(error);
        proximos.innerHTML = `<p>${error.message}</p>`;
    }
}

// De momento devuelve el identificador del lugar.
// Más adelante leerá locations.json y mostrará el nombre traducido.
function obtenerLugar(lugar) {
    return lugar;
}

document.addEventListener("DOMContentLoaded", cargarConciertos);
