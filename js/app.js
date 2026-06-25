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
            return `${textos.months.july} ${dia}`;

        case "en":

            let sufijo = "th";

            if (dia % 10 === 1 && dia !== 11) sufijo = "st";
            else if (dia % 10 === 2 && dia !== 12) sufijo = "nd";
            else if (dia % 10 === 3 && dia !== 13) sufijo = "rd";

            return `${textos.months.july} ${dia}${sufijo}`;

        case "fr":

            if (dia == 1) {
                return `1er ${textos.months.july}`;
            }

            return `${dia} ${textos.months.july}`;

        default:
            return `${dia} de ${textos.months.july}`;

    }

}

document.addEventListener("DOMContentLoaded", iniciarApp);
