class Tablero {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.arrayImg = ["🇦🇷", "🇧🇪","🇧🇷","🇨🇦","🇨🇱","🇩🇪","🇪🇦","🇭🇷", "🇫🇷","🇮🇹",];
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
        // Creamos el tablero en DOM
        let tabla = document.createElement('table');
        let row;
        let column;

        for (let i = 0; i < this.rows; i++) {
            row = document.createElement('tr');
            tabla.appendChild(row);

            for (let j = 0; j < this.columns; j++) {
                column = document.createElement('td');
                column.id = `f${i}_c${j}`;
                column.dataset.row = i;
                column.dataset.column = j;
                column.dataset.despejado = false;
                row.appendChild(column);
            }
        }

        document.body.appendChild(tabla);
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

        super.drawBoard();
        let cellSelected;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                cellSelected = document.getElementById(`f${i}_c${j}`);

                this.clickImageAndCheck = this.clickImageAndCheck.bind(this);

                cellSelected.addEventListener('click', this.clickImageAndCheck);
                
            }
        }
    }

    clickImageAndCheck(elEvento){
        let evento = elEvento || window.event;
        let cell = evento.currentTarget;
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);

        let emoji = this.arrayTablero[row][column];

        cell.innerHTML = emoji;
    }

}

/* MAIN */ 
window.onload = function() {

    do {
        let numrows = prompt('¿Cuantas filas quieres?');
        let numcolumns = prompt('¿Cuantas columnas quieres?');

        var exit = false;

        if (numcolumns % 2 == 0){
            exit = true;
            
            new MemoryGame(numrows, numcolumns);

        } else{
            window.alert("ERROR: Debes introducir números pares. Intentalo de nuevo, por favor");
        }

    } while (!exit);

}