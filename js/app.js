async function cargarConciertos() {
    const proximos = document.getElementById("proximos");

    try {
        const respuesta = await fetch("data/conciertos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar conciertos.json");
        }

        const conciertos = await respuesta.json();

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

                const titulo = document.createElement("h2");
                titulo.textContent = `📅 ${dia} de julio`;
                titulo.style.marginTop = "30px";

                proximos.appendChild(titulo);

                grupos[dia].forEach(concierto => {

                    const tarjeta = document.createElement("div");
                    tarjeta.className = "concierto";

                    tarjeta.innerHTML = `
                        <h3>${concierto.artista}</h3>
                        <p>🕒 ${concierto.hora}</p>
                        <p>📍 ${concierto.escenario}</p>
                    `;

                    proximos.appendChild(tarjeta);

                });

            });

    } catch (error) {
        console.error(error);
        proximos.innerHTML = `<p>${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", cargarConciertos);