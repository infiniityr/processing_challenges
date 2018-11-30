
let group;

//Canvas Constants
const canvasWidth = 1600;
const canvasHeight = 900;
const canvasWidthOffset = 200;
const canvasHeightOffset = 200;

const framePerSecond = 30;

// Canvas Components
let slider;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    slider = createSlider(0, 10, 2, 0.05);
    slider.position(canvasWidth-180, 500);
    frameRate(framePerSecond);
    group = new Group();
}

function draw() {
    background(200);
    group.update();
    group.show();

    // Components update
    text(slider.value(), slider.x + slider.width + 10, slider.y);
}