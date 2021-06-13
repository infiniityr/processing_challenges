

//Canvas Constants
const canvasWidth = 500;
const canvasHeight = 500;

const spacing = 5

const framePerSecond = 60;

let walker = null

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(51);
    walker = new Walker({
        maxHeight: canvasHeight / spacing,
        maxWidth: canvasWidth / spacing
    })
    frameRate(framePerSecond);
}

function draw() {

    /*stroke(255);
    strokeWeight(spacing * 0.5);
    point(walker.currentPos.x * spacing, walker.currentPos.y * spacing);*/


    strokeWeight(2);
    stroke(255);
    beginShape();
    vertex(walker.currentPos.x * spacing, walker.currentPos.y * spacing);
    const isStuck = walker.nextMove();
    vertex(walker.currentPos.x * spacing, walker.currentPos.y * spacing);
    endShape();

    if (isStuck) {
        console.log('this is the end')
        noLoop()
    }

}
