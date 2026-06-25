async function iniciarApp() {

    const proximos = document.getElementById("proximos");

    try {

        // Cargar todos los datos una sola vez
        await cargarDatos();

        // Dibujar los eventos
        pintarEventos();

    } catch (error) {

        console.error(error);
        proximos.innerHTML = `<p>${error.message}</p>`;

    }

}

function pintarEventos() {

    const proximos = document.getElementById("proximos");

    proximos.innerHTML = "";

    const grupos = {};

    conciertos.forEach(concierto => {

        if (!grupos[concierto.dia]) {
            grupos[concierto.dia] = [];
        }

        grupos[concierto.dia].push(concierto);

    });

    Object.keys(grupos)
        .sort((a, b) => a - b)
        .forEach(dia => {

            const tituloDia = document.createElement("h2");
            tituloDia.textContent = `📅 ${dia} de julio`;
            tituloDia.style.marginTop = "30px";

            proximos.appendChild(tituloDia);

            grupos[dia].sort((a, b) => {
                const [horaA, minutoA] = a.hora.split(":").map(Number);
                const [horaB, minutoB] = b.hora.split(":").map(Number);
            return (horaA * 60 + minutoA) - (horaB * 60 + minutoB);
            });

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

}

function obtenerLugar(idLugar) {

    if (!lugares[idLugar]) {
        return idLugar;
    }

    return lugares[idLugar][idioma] || lugares[idLugar].es;

}

document.addEventListener("DOMContentLoaded", iniciarApp);
