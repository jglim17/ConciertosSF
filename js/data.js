// Datos globales
let conciertos = [];
let lugares = {};
let gigantes = [];
let fuegos = [];

async function cargarDatos() {

    async function cargar(nombre) {

        const respuesta = await fetch(`data/${nombre}.json`);

        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar ${nombre}.json`);
        }

        return await respuesta.json();

    }

    [
        conciertos,
        lugares,
        gigantes,
        fuegos
    ] = await Promise.all([
        cargar("conciertos"),
        cargar("lugares"),
        cargar("gigantes"),
        cargar("fuegos")
    ]);

}
