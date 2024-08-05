const  CIRCULO = "circulo";
const EQUIS = "equis";

const  mensaje = document.getElementById("mensaje")

let intentos;
let posiciones = [0,1,2,3,4,5,6,7,8];
let posicionesX = [];
let posicionesO = [];

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
    intentos = 0;
    turnoCirculo = false;
    celdas.forEach(celda => {
        celda.addEventListener("click", manejarClick, {once:true})
    });
}

function manejarClick(evento){
    intentos++;

    const celda = evento.target;
    const jugadorClase = turnoCirculo ? CIRCULO : EQUIS

    posiciones.splice(0,1)

    console.log(posiciones);

    //turnoCirculo ? ponerMarca(celdas[obtenerRandom(posiciones.splice(evento.target.id,1))], jugadorClase) : ponerMarca(celda,jugadorClase)

    //let posicion = obtenerRandom(posiciones.splice(evento.target.id),1)
    //console.log("targeted: ",);

    if(turnoCirculo){
        let posicion = obtenerRandom(posiciones.splice(evento.target.id),1)
        celda.removeEventListener("click", manejarClick)
        celda[posicion].classList.add("circulo");
        
    }

    //ponerMarca(celda,jugadorClase);

   
    //console.log("Random Number", posicion);

    console.log("intentos: ",intentos);

    if(intentos>=5 && revisarGanador(jugadorClase)){
       
        mensaje.innerHTML = "El ganador es el jugador es: "+ jugadorClase
        
    }
    turnoCirculo = !turnoCirculo; 
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

}

function obtenerRandom(disponiblesArr){
        const randomIndex = Math.floor(Math.random() * (disponiblesArr.length -1));
        const randomElement = disponiblesArr[randomIndex];
        return randomElement;
}