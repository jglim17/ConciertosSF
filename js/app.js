async function cargarConciertos() {
    const div = document.getElementById("proximos");

    try {
        const respuesta = await fetch("data/conciertos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo.");
        }

        const conciertos = await respuesta.json();

        div.innerHTML = "";

        conciertos.forEach(concierto => {
            div.innerHTML += `
                <div class="concierto">
                    <strong>${concierto.hora}</strong> - ${concierto.artista}<br>
                    <small>${concierto.escenario}</small>
                </div>
            `;
        });

    } catch (error) {
        div.innerHTML = "❌ Error cargando conciertos.";
        console.error(error);
    }
}

cargarConciertos();