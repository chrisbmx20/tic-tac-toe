const  CIRCULO = "circulo";
const EQUIS = "equis";

const mensaje = document.getElementById("mensaje")
let  posiciones = [0,1,2,3,4,5,6,7,8]

const COMBINACIONES_GANADORAS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [6,4,2],
    [0,4,8]
]

let celdas = document.querySelectorAll('[data-cell]');
const tablero = document.getElementById("tablero");

let turnoCirculo = false;

comenzarJuego()

function comenzarJuego(){
    turnoCirculo = false;
    celdas.forEach(celda => {
        celda.addEventListener("click", manejarClick, {once:true})
    });
}

function manejarClick(evento){
    const celda = evento.target;
    let jugadorClase = turnoCirculo ? CIRCULO : EQUIS

    ponerMarca(celda,jugadorClase);
    revisarGanador(jugadorClase) ? mensaje.textContent = "El Ganador es: "+ jugadorClase : console.log("");

    posiciones = eliminarElemento(posiciones,celda.id);
    console.log(posiciones);
    cambiarJugador();

    if(turnoCirculo){
        const posicion = obtenerRandom(posiciones)
        jugadorClase = turnoCirculo ? CIRCULO : EQUIS
        //celdas[posicion].removeEventListener("click",manejarClick)
        celdas[posicion].classList.add(CIRCULO);
        posiciones = eliminarElemento(posiciones,posicion);
        console.log(posiciones);
        revisarGanador(jugadorClase) ? mensaje.textContent = "El Ganador es: "+ jugadorClase : console.log("");
        cambiarJugador();
    }

     
}


function ponerMarca(celda,jugadorClase){
    celda.classList.add(jugadorClase);
    
}

function revisarGanador(jugadorClase) {

	return COMBINACIONES_GANADORAS.some(combinacion => {
		return combinacion.every(index => {
			return celdas[index].classList.contains(jugadorClase)
		})
	})
}

function cambiarJugador(){
    turnoCirculo = !turnoCirculo;
}


//obtenemos un numero aleatorio del array
function obtenerRandom(disponiblesArr){
        const randomIndex = Math.floor(Math.random() * (disponiblesArr.length -1));
        const randomElement = disponiblesArr[randomIndex];
        return randomElement;
}

function eliminarElemento(array, elementoEliminar){
    let newArr = []

    array.forEach(element => {
        element == elementoEliminar ? console.log("") : newArr.push(element)
        
    });

    return newArr;
}