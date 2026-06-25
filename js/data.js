let conciertos = [];
let lugares = {};
let gigantes = [];
let fuegos = [];

async function cargarDatos() {

    async function cargar(nombre) {

        const res = await fetch(`data/${nombre}.json`);

        const texto = await res.text();

        console.log(nombre, texto);

        return JSON.parse(texto);

    }

    conciertos = await cargar("conciertos");
    lugares = await cargar("lugares");
    gigantes = await cargar("gigantes");
    fuegos = await cargar("fuegos");

}
