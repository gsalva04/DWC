class Tablero {

    numFilas;
    numColumnas;

    constructor(numFilas, numColumnas) {
        this.numFilas = numFilas;
        this.numColumnas = numColumnas;

        this.crearTablero();
    }

    crearTablero() {

        if (numColumnas % 2 !== 0){
            window.alert("ERROR: Debes introducir números pares. Intentalo de nuevo, por favor");
            //Tiene que volver a empezar el programa después del error
        } else{
            // Crear array bidimensional para guardar las minas
            this.arrayTablero = [];

            for (let fila = 0; fila < this.numFilas; fila++) {
                this.arrayTablero[fila] = [];

                for (let columna = 0; columna < this.numColumnas; columna++) {
                    this.arrayTablero[fila][columna] = '';
                }
            }
        }
    }

    dibujarTablero() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.numFilas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.numColumnas; j++) {
                document.write(`<td>${ this.arrayTablero[i][j]}</td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }
}

class JuegoMemoria extends Tablero{

    constructor(numFilas, numColumnas, numMinas) {
        super(numFilas, numColumnas);
        this.numMinas = numMinas;
    }

    colocarParejaCartas(){

    }
}

/* MAIN */ 

let numFilas = prompt('¿Cuantas filas quieres?');
let numColumnas = prompt('¿Cuantas columnas quieres?');

let tablero = new Tablero(numFilas, numColumnas);
console.log(tablero.arrayTablero);
tablero.dibujarTablero();

