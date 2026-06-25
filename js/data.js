let conciertos = [];
let lugares = {};
let gigantes = [];
let fuegos = [];

async function cargarDatos() {

    const [
        conciertosRes,
        lugaresRes,
        gigantesRes,
        fuegosRes
    ] = await Promise.all([
        fetch("data/conciertos.json"),
        fetch("data/lugares.json"),
        fetch("data/gigantes.json"),
        fetch("data/fuegos.json")
    ]);

    conciertos = await conciertosRes.json();
    lugares = await lugaresRes.json();
    gigantes = await gigantesRes.json();
    fuegos = await fuegosRes.json();

}
