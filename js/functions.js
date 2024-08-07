const  CIRCULO = "circulo";
const EQUIS = "equis";

const mensaje = document.getElementById("mensaje")
let  posiciones = [0,1,2,3,4,5,6,7,8]

let jugadores = {
    jugador1 : 0,
    jugador2: 0
}

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
const reiniciar = document.getElementById('reset');

let turnoCirculo = false;

comenzarJuego()

reiniciar.addEventListener("click",comenzarJuego);

function comenzarJuego(){
    turnoCirculo = false;
    mensaje.innerHTML = "";
    celdas.forEach(celda => {
        celda.classList.remove(CIRCULO);
        celda.classList.remove(EQUIS);
        celda.removeEventListener("click", manejarClick);
        celda.addEventListener("click", manejarClick, {once:true})
    });
}

function manejarClick(evento){
    const celda = evento.target;
    
    let jugadorClase = turnoCirculo ? CIRCULO : EQUIS

    ponerMarca(celda,jugadorClase);

    if(revisarGanador(jugadorClase)){
        mensaje.textContent = "El Ganador es: "+ jugadorClase
        celdas.forEach(celda => {
            celda.removeEventListener("click", manejarClick)
        });
       
    }

    posiciones = eliminarElemento(posiciones,celda.id);
    console.log(posiciones);
    cambiarJugador();

   
    

    if(turnoCirculo && posiciones.length>0){
        const posicion = obtenerRandom(posiciones)
        jugadorClase = turnoCirculo ? CIRCULO : EQUIS
        celdas[posicion].classList.add(CIRCULO);
        celdas[posicion].removeEventListener("click", manejarClick)
        posiciones = eliminarElemento(posiciones,posicion);
        console.log(posiciones);

        if(revisarGanador(jugadorClase)){
            mensaje.textContent = "El Ganador es: "+ jugadorClase
            celdas.forEach(celda => {
                celda.removeEventListener("click", manejarClick)
            });
           
        }
        
        cambiarJugador();
    }

     
}

function limpiarClases(){

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