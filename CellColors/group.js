
//The color we are looking for
let referenceR = Cell.randomColor();
let referenceG = Cell.randomColor();
let referenceB = Cell.randomColor();

let numberOfRound = 0;
let numberOfColorFound = 0;

class Group {

    constructor() {
        this.cells = [];
        this.initCells();
        this.nbCellsWidth = (canvasWidth-canvasWidthOffset)/Cell.width;

        //The color we are looking for
        referenceR = Cell.randomColor();
        referenceG = Cell.randomColor();
        referenceB = Cell.randomColor();
    }

    show() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].mutate();
            this.cells[i].show();
        }

        fill(parseInt(referenceR, 2), parseInt(referenceG, 2), parseInt(referenceB, 2));
        rect(canvasWidth-170, 50, 150, 100);
        // Text
        fill(0);
        text("Couleur de référence :", canvasWidth-170, 20, 150, 30);
        text("Finess le plus élevé :"+this.cells[0].finess, canvasWidth-170, 200, 150, 30);
        text("Finess moyen :"+this.averageFiness(), canvasWidth-170, 230, 150, 30);
        text("Finess des 100 premiers:"+this.averageFiness(100), canvasWidth-170, 260, 150, 30);
        text("Nb de tours : "+numberOfRound, canvasWidth-170, 290, 150, 30);
        text("Nb de couleurs : "+numberOfColorFound, canvasWidth-170, 320, 150, 30);
    }

    update() {
        numberOfRound++;
        this.cells.sort(sortCells);
        if (this.averageFiness() > Group.finessValid) {
            numberOfRound = 0;
            numberOfColorFound++;
            referenceR = Cell.randomColor();
            referenceG = Cell.randomColor();
            referenceB = Cell.randomColor();
        }
        this.cells.splice(Group.nbCells/2, Group.nbCells/2);
        for (let i = this.cells.length; i < Group.nbCells; i++) {
            let x = (i % this.nbCellsWidth)*Cell.width;
            let y = Math.floor(i / this.nbCellsWidth)*Cell.height;
            this.cells[i] = this.createCell();
            this.cells[i].x = x;
            this.cells[i].y = y;
            this.cells[i].i = i;
        }
        this.arrangeCells();
    }

    initCells() {
        for (let i = 0; i < Group.nbCells; i++) {
            let x = (i % this.nbCellsWidth)*Cell.width;
            let y = Math.floor(i / this.nbCellsWidth)*Cell.height;
            this.cells[i] = new Cell(x, y, i);
        }
    }

    arrangeCells() {
        for (let i = 0; i < this.cells.length; i++) {
            let x = (i % this.nbCellsWidth)*Cell.width;
            let y = Math.floor(i / this.nbCellsWidth)*Cell.height;
            this.cells[i].x = x;
            this.cells[i].y = y;
        }
    }

    averageFiness(nbCells = 0) {
        if (nbCells === 0)
            nbCells = Group.nbCells;
        let sum = 0;
        for (let i = 0; i < nbCells; i++) {
            sum += this.cells[i].finess;
        }
        return sum / nbCells;
    }

    createCell() {
        let cell = new Cell(0,0,0);
        let parent1 = this.cells[Math.floor(random(0, this.cells.length))];
        let parent2 = this.cells[Math.floor(random(0, this.cells.length))];
        cell.r = parent1.r.crossover(parent2.r) ;
        cell.g = parent1.g.crossover(parent2.g);
        cell.b = parent1.b.crossover(parent2.b);
        return cell;
    }

    // Constants
    static get nbCells() {
        return 200;
    }

    static get finessValid() {
        return 99;
    }

}

function sortCells(a, b) {
    return b.finess - a.finess;
}