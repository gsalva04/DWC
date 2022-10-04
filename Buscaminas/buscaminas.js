let maxFilas = prompt('¿Cuantas filas quieres?')
let maxColumnas = prompt('¿Cuantas columnas quieres?')
let numMinas = prompt('¿Cuantas minas quieres introducir?')

//Creamos tablero en html
document.write('<table>');

for(let i = 0; i < maxFilas; i++){
    document.write('<tr>');

    for(let j = 0; j< maxColumnas; j++){
        document.write('<td></td>');
    }

    document.write('</tr>')
}

document.write('</table>');

let arrayTablero = [];
let contadorMinas = 0;
let posColumna;
let posFila;

//Hacemos array bidimensional
for(let fila = 0; fila < maxFilas; fila ++){
    arrayTablero[fila] = []

    for(let columna = 0; columna < maxColumnas; columna++){
        arrayTablero[fila][columna] = '';
    }
}

while(contadorMinas <= numMinas){
    posFila = Math.floor(Math.random()*maxFilas);
    posColumna =  Math.floor(Math.random()*maxColumnas);

    if(arrayTablero[posFila][posColumna] != 'MINA'){
        arrayTablero[posFila][posColumna] != 'MINA';
        contador++;
    }
}

//Saber cuantas minas tiene un numero del centro a su alrededor