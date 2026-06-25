let diaActual = 6;

async function iniciarApp() {

    const proximos = document.getElementById("proximos");

    try {

        await cargarIdioma();

        await cargarDatos();

        diaActual = obtenerDiaInicial();

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

        // Solo mostrar hoy y mañana
        if (
            concierto.dia !== diaActual &&
            concierto.dia !== diaActual + 1
        ) {
            return;
        }

        if (!grupos[concierto.dia]) {
            grupos[concierto.dia] = [];
        }

        grupos[concierto.dia].push(concierto);

    });

    Object.keys(grupos)
        .sort((a, b) => a - b)
        .forEach(dia => {

            grupos[dia].sort((a, b) =>
                convertirHora(a.hora) - convertirHora(b.hora)
            );

            const tituloDia = document.createElement("h2");
            tituloDia.textContent = `📅 ${obtenerFecha(Number(dia))}`;
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

function obtenerDiaInicial() {

    const hoy = new Date();

    // JavaScript: enero = 0 ... julio = 6
    if (hoy.getMonth() !== 6) {
        return 6;
    }

    const dia = hoy.getDate();

    if (dia < 6) return 6;
    if (dia > 14) return 14;

    return dia;

}

function convertirHora(hora) {

    let [h, m] = hora.split(":").map(Number);

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

            if (dia === 1) {
                return `1er ${textos.months.july}`;
            }

            return `${dia} ${textos.months.july}`;

        default:

            return `${dia} de ${textos.months.july}`;

    }

}

document.addEventListener("DOMContentLoaded", iniciarApp);
