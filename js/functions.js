const CIRCULO = "circulo";
const EQUIS = "equis";

const mensaje = document.getElementById("mensaje");
let posiciones;

let jugadores = JSON.parse(localStorage.getItem("puntaje")) || {
    jugador1: 0,
    jugador2: 0
};

// Selecciona todos los elementos con el atributo 'data-cell' y conviértelos en un array
let celdas = Array.from(document.querySelectorAll('[data-cell]'));
const tablero = document.getElementById("tablero");
const reiniciar = document.getElementById('reset');

let turnoCirculo = false;

reiniciar.addEventListener("click", comenzarJuego);

const COMBINACIONES_GANADORAS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4, 8]
];

comenzarJuego();

function comenzarJuego() {
    dibujarPuntaje();
    posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    turnoCirculo = false;
    mensaje.innerHTML = "";
    celdas.forEach(celda => {
        celda.classList.remove(CIRCULO);
        celda.classList.remove(EQUIS);
        celda.removeEventListener("click", manejarClick);
        celda.addEventListener("click", manejarClick, { once: true });
    });
}

function manejarClick(evento) {
    const celda = evento.target;

    let jugadorClase = turnoCirculo ? CIRCULO : EQUIS;

    ponerMarca(celda, jugadorClase);

    if (revisarGanador(jugadorClase)) {
        mensaje.textContent = "El Ganador es: " + jugadorClase;
        celdas.forEach(celda => {
            celda.removeEventListener("click", manejarClick);
        });

        jugadorClase == CIRCULO ? jugadores.jugador2++ : jugadores.jugador1++;
        localStorage.setItem("puntaje", JSON.stringify(jugadores));

        document.getElementById("jugador1").textContent = jugadores.jugador1;
        document.getElementById("jugador2").textContent = jugadores.jugador2;
        dibujarPuntaje();
    } else if (esEmpate()) {  // Verifica si es un empate
        mensaje.textContent = "Es un empate!";
    }

    posiciones = eliminarElemento(posiciones, celda.id);
    cambiarJugador();

    if (turnoCirculo && posiciones.length > 0) {
        const posicion = obtenerRandom(posiciones);
        jugadorClase = turnoCirculo ? CIRCULO : EQUIS;
        celdas[posicion].classList.add(CIRCULO);
        celdas[posicion].removeEventListener("click", manejarClick);
        posiciones = eliminarElemento(posiciones, posicion);
        console.log(posiciones);

        if (revisarGanador(jugadorClase)) {
            mensaje.textContent = "El Ganador es: " + jugadorClase;
            celdas.forEach(celda => {
                celda.removeEventListener("click", manejarClick);
            });

            jugadorClase == CIRCULO ? jugadores.jugador2++ : jugadores.jugador1++;

            console.log("posicionesX", posiciones.length);
            localStorage.setItem("puntaje", JSON.stringify(jugadores));

            dibujarPuntaje();
        }

        cambiarJugador();
    }
}

function ponerMarca(celda, jugadorClase) {
    celda.classList.add(jugadorClase);
}

function revisarGanador(jugadorClase) {
    return COMBINACIONES_GANADORAS.some(combinacion => {
        return combinacion.every(index => {
            return celdas[index].classList.contains(jugadorClase);
        });
    });
}

function esEmpate() {
    // Verifica si todas las celdas tienen 'circulo' o 'equis'
    return celdas.every(celda => {
        return celda.classList.contains(CIRCULO) || celda.classList.contains(EQUIS);
    });
}

function cambiarJugador() {
    turnoCirculo = !turnoCirculo;
}

function obtenerRandom(disponiblesArr) {
    const randomIndex = Math.floor(Math.random() * disponiblesArr.length);
    return disponiblesArr[randomIndex];
}

function eliminarElemento(array, elementoEliminar) {
    let newArr = [];

    array.forEach(element => {
        element == elementoEliminar ? console.log("") : newArr.push(element);
    });

    return newArr;
}

function dibujarPuntaje() {
    document.getElementById("jugador1").textContent = jugadores.jugador1;
    document.getElementById("jugador2").textContent = jugadores.jugador2;
}
