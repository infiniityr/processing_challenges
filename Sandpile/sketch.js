

//Canvas Constants
const canvasWidth = 720;
const canvasHeight = 720;

const cellsize = 2;

const gridHeight = canvasHeight/cellsize;
const gridWidth = canvasWidth/cellsize;

let currentSandDropped = 0;
const grainsDrop = 200000;

const grid = Array(gridWidth).fill().map(() => Array(gridHeight).fill(0))

const framePerSecond = 60;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(framePerSecond);
}

function draw() {
    background(255);
    if (currentSandDropped >= grainsDrop) {
        noLoop();
    } else {
        for (let i = 0; i < 100; i++) {
            //addSandGrain(-gridWidth/8, -gridHeight/8);
            //addSandGrain(gridWidth/8, gridHeight/8);
            addSandGrain(0,0);
            currentSandDropped++;
        }
    }
    drawCells();
}

function drawCells()
{
    for (let x in grid) {
        for (let y in grid) {
            if (grid[x][y] > 0) {
                if (grid[x][y] == 1) {
                    fill(255, 255, 255);
                } else if (grid[x][y] == 2) {
                    fill(0, 255, 0);
                } else {
                    fill(0, 0, 255);
                }
                rect(x*cellsize, y*cellsize, cellsize, cellsize);
            }
        }
    }
}

function addSandGrain(offsetX, offsetY) {
    let x = parseInt(offsetX+gridWidth/2),
        y = parseInt(offsetY+gridHeight/2);
    grid[x][y]++;
    failIfTooMuch(x, y);
}

function failIfTooMuch(x, y) {
    if (grid[x][y] > 3) {
        grid[x][y] = 0;
        if (x-1 >= 0) {
            grid[x-1][y]++;
            failIfTooMuch(x-1, y);
        }
        if (y-1 >= 0) {
            grid[x][y-1]++;
            failIfTooMuch(x,y-1);
        }
        if (x+1 < gridWidth) {
            grid[x+1][y]++;
            failIfTooMuch(x+1, y);
        }
        if (y+1 < gridHeight) {
            grid[x][y+1]++;
            failIfTooMuch(x, y+1);
        }
    }
}