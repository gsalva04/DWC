class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.arrayImg = ["🇦🇷", "🇧🇪","🇧🇷","🇨🇦","🇨🇱","🇩🇪","🇪🇦","🇭🇷", "🇫🇷","🇮🇹",];
        this.createBoard();
    }

    createBoard() {
        this.arrayBoard = [];

        for (let row = 0; row < this.rows; row++) {
            this.arrayBoard[row] = [];

            for (let column = 0; column < this.columns; column++) {
                this.arrayBoard[row][column] = '';
            }
        }
    }

    drawBoard(){
        let table = document.createElement('table');
        let row;
        let column;

        for (let i = 0; i < this.rows; i++) {
            row = document.createElement('tr');
            table.appendChild(row);

            for (let j = 0; j < this.columns; j++) {
                column = document.createElement('td');
                row.appendChild(column);
                column.id= `f${i}_c${j}`;
                column.dataset.row = i;
                column.dataset.column = j;
                column.dataset.nothing = false;

                document.oncontextmenu = function(){return false};
            }
        }

        document.body.appendChild(table);
    }
}


class MemoryGame extends Board {

    constructor(rows, columns){
        super(rows,columns);
        this.firstClick;
        this.secondClick;

        this.counter = 0;

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

                if (this.arrayBoard[rowRandom1][columnRandom1] == '') {
                    this.arrayBoard[rowRandom1][columnRandom1] = this.arrayImg[arrayPosition];
                    rowRandom2 = Math.floor(Math.random() * this.rows);
                    columnRandom2 = Math.floor(Math.random() * this.columns);

                    while (this.arrayBoard[rowRandom2][columnRandom2] != '') {
                        rowRandom2 = Math.floor(Math.random() * this.rows);
                        columnRandom2 = Math.floor(Math.random() * this.columns);

                    }
                    this.arrayBoard[rowRandom2][columnRandom2] = this.arrayImg[arrayPosition];
                    exit = true;
                    arrayPosition++;
                }
            }

        }

        super.drawBoard();
        let cellSelected;

        this.clickImageAndCheck = this.clickImageAndCheck.bind(this);

        for (let i = 0; i < this.rows; i++) {
            
            for (let j = 0; j < this.columns; j++) {
                cellSelected = document.getElementById(`f${i}_c${j}`);

                cellSelected.addEventListener("contextmenu",this.clickImageAndCheck);

                document.oncontextmenu = function(){return false};
            }
        }  
        //Bttn RESET
        const ressetButton = document.createElement('button');
        ressetButton.type = 'button';
        ressetButton.innerText = 'VOLVER A EMPEZAR';
        document.body.appendChild(ressetButton);
        this.resetGame = this.resetGame.bind(this);

        ressetButton.addEventListener("click", this.resetGame);
    }

    clickImageAndCheck(elEvento){
        let event = elEvento || window.event;
        let cell = event.currentTarget;
        let row = cell.dataset.row;
        let column = cell.dataset.column;
        let emoji;

        switch (this.counter) {
            case 0:
                emoji = this.arrayBoard[row][column];
                cell.innerHTML = emoji;    
                cell.dataset.nothing = true;
                this.firstClick = [row,column];
                cell.removeEventListener("contextmenu",this.clickImageAndCheck);
                this.counter = 1;
                break;

            case 1:
                emoji = this.arrayBoard[row][column];
                cell.innerHTML = emoji;            
                cell.dataset.nothing = true;
                this.secondClick = [row,column]
    
                if (this.arrayBoard[this.secondClick[0]][[this.secondClick[1]]] !=
                    this.arrayBoard[this.firstClick[0]][[this.firstClick[1]]]){
    
                setTimeout(() => {
                    cell.innerHTML = "";
                    cell.dataset.nothing = false;
                    cell.addEventListener("contextmenu",this.clickImageAndCheck);
            
                    cell = document.getElementById(`f${this.firstClick[0]}_c${this.firstClick[1]}`);
                    cell.innerHTML = "";
                    cell.dataset.nothing = false;
                    cell.addEventListener("contextmenu",this.clickImageAndCheck);
                    }, 500);
                }

                this.counter = 0;

              break;

          }
    }

    resetGame(){
        if (window.confirm("¿Seguro que quieres volver a empezar la partida?")) {
            location.reload()
        }
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