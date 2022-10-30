class Tablero {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.arrayImg = ["<img src='img/athletic.jpg'>", 
        "<img src='img/atletico.jpg'>",
        "<img src='img/barcelona.jpg'>",
        "<img src='img/betis.jpg'>",
        "<img src='img/españa.jpg'>",
        "<img src='img/mallorca.jpg'>",
        "<img src='img/realMadrid.jpg'>",
        "<img src='img/sevilla.jpg'>",
        "<img src='img/valencia.jpg'>",
        "<img src='img/villareal.jpg'>",
    ];
        this.createBoard();
    }

    createBoard() {
        // Crear array bidimensional para guardar las minas
        this.arrayTablero = [];

        for (let row = 0; row < this.rows; row++) {
            this.arrayTablero[row] = [];

            for (let columns = 0; columns < this.columns; columns++) {
                this.arrayTablero[row][columns] = '';
            }
        }
    }

    drawBoard() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.rows; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columns; j++) {
                document.write(`<td>${this.arrayTablero[i][j]}</td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }

}


class MemoryGame extends Tablero {

    constructor(rows, columns, arrayImg){
        super(rows, columns, arrayImg);

        this.putImage();
    }

    putImage() {

        let arrayPosition = 0;
        let rowRandom1;
        let columnRandom1;
        let rowRandom2;
        let columnRandom2;

        for (let i = 0; i < (this.rows * this.columns)/2; i++){

            if(arrayPosition >= 10){
                arrayPosition = 0;
            }

            let exit = false;

            while(exit == false){

                rowRandom1 = Math.floor(Math.random() * this.rows);
                columnRandom1 = Math.floor(Math.random() * this.columns);

                if (this.arrayTablero[rowRandom1][columnRandom1] == '') {
                    this.arrayTablero[rowRandom1][columnRandom1] = this.arrayImg[arrayPosition];
                    rowRandom2 = Math.floor(Math.random() * this.rows);
                    columnRandom2 = Math.floor(Math.random() * this.columns);

                    if (this.arrayTablero[rowRandom2][columnRandom2] == '') {
                        this.arrayTablero[rowRandom2][columnRandom2] = this.arrayImg[arrayPosition];
                        exit = true;
                        arrayPosition++;
                    } else {
                        while (this.arrayTablero[rowRandom2][columnRandom2] != '') {
                            rowRandom2 = Math.floor(Math.random() * this.rows);
                            columnRandom2 = Math.floor(Math.random() * this.columns);

                        }
                        this.arrayTablero[rowRandom2][columnRandom2] = this.arrayImg[arrayPosition];
                        exit = true;
                        arrayPosition++;
                    }

                }
            }

        }
    }
}

/* MAIN */ 

do {
    let numrows = prompt('¿Cuantas filas quieres?');
    let numcolumns = prompt('¿Cuantas columnas quieres?');

    var exit = false;

    if (numcolumns % 2 == 0){
        exit = true;
        
        let memoryGame = new MemoryGame(numrows, numcolumns);
        memoryGame.drawBoard();

    } else{
        window.alert("ERROR: Debes introducir números pares. Intentalo de nuevo, por favor");
    }

} while (!exit);

