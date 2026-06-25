async function iniciarApp() {

    const proximos = document.getElementById("proximos");

    try {

        // Cargar todos los datos una sola vez
        await cargarDatos();

        // Pintar eventos
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

            console.log("ANTES", dia, grupos[dia].map(c => c.hora));

            grupos[dia].sort((a, b) => convertirHora(a.hora) - convertirHora(b.hora));

            console.log("DESPUÉS", dia, grupos[dia].map(c => c.hora));

            const tituloDia = document.createElement("h2");
            tituloDia.textContent = `📅 ${obtenerFecha(dia)}`;
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

}

function convertirHora(hora) {

    let [h, m] = hora.split(":").map(Number);

    // Las horas de madrugada se consideran al final del día
    if (h < 6) {
        h += 24;
    }

    return h * 60 + m;

}

function obtenerLugar(idLugar) {

    if (!lugares[idLugar]) {
        return idLugar;
    }

    return lugares[idLugar][idioma] || lugares[idLugar].es;

}

function obtenerFecha(dia) {

    switch (idioma) {

        case "eu":
            return `${dia} uztaila`;

        case "en":
            return `July ${dia}`;

        case "fr":
            return `${dia} juillet`;

        default:
            return `${dia} de julio`;

    }

}

document.addEventListener("DOMContentLoaded", iniciarApp);
