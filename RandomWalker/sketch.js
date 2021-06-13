

//Canvas Constants
const canvasWidth = 1000;
const canvasHeight = 1000;
const spacing = 20
const isPoint = false
const canVisitMultipleTimes = true

const framePerSecond = 60;

let walker = null

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(51);
    walker = new Walker({
        maxHeight: canvasHeight / spacing,
        maxWidth: canvasWidth / spacing,
        canVisitMultipleTimes
    })
    frameRate(framePerSecond);
}

function draw() {

    strokeWeight(0.3 * spacing);
    stroke(255, 100);
    beginShape();
    if (!isPoint) {
        vertex(walker.currentPos.x * spacing, walker.currentPos.y * spacing);
    }
    const isStuck = walker.nextMove();
    stroke(255, 100);
    if (isPoint) {
        point(walker.currentPos.x * spacing, walker.currentPos.y * spacing)
    } else {
        vertex(walker.currentPos.x * spacing, walker.currentPos.y * spacing);
    }
    endShape();

    if (isStuck) {
        console.log('this is the end')
        noLoop()
    }

}
