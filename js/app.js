async function cargarConciertos() {
    const div = document.getElementById("proximos");

    const respuesta = await fetch("data/conciertos.json");
    const conciertos = await respuesta.json();

    div.innerHTML = JSON.stringify(conciertos);
}
cargarConciertos();