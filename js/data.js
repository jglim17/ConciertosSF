// Datos globales
let conciertos = [];
let lugares = {};
let gigantes = [];
let fuegos = [];

async function cargarDatos() {

    try {

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

        if (!conciertosRes.ok) throw new Error("Error cargando conciertos.json");
        if (!lugaresRes.ok) throw new Error("Error cargando lugares.json");
        if (!gigantesRes.ok) throw new Error("Error cargando gigantes.json");
        if (!fuegosRes.ok) throw new Error("Error cargando fuegos.json");

        conciertos = await conciertosRes.json();
        lugares = await lugaresRes.json();
        gigantes = await gigantesRes.json();
        fuegos = await fuegosRes.json();

        console.log("Datos cargados correctamente");
        console.log("Conciertos:", conciertos.length);
        console.log("Lugares:", lugares);
        console.log("Gigantes:", gigantes.length);
        console.log("Fuegos:", fuegos.length);

    } catch (error) {

        console.error(error);
        throw error;

    }

}
