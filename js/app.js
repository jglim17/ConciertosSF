async function cargarConciertos() {
    const div = document.getElementById("proximos");

    try {
        const respuesta = await fetch("data/conciertos.json");
        const conciertos = await respuesta.json();

        let html = "";

        conciertos.forEach(concierto => {
            html += `
                <div class="concierto">
                    <h3>${concierto.artista}</h3>
                    <p>🕒 ${concierto.hora}</p>
                    <p>📍 ${concierto.escenario}</p>
                </div>
            `;
        });

        div.innerHTML = html;

    } catch (error) {
        div.innerHTML = "❌ Error cargando conciertos";
        console.error(error);
    }
}

cargarConciertos();