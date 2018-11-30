//Canvas Constants
const canvasWidth = 450;
const canvasHeight = 250;
const canvasWidthOffset = 200;
const canvasHeightOffset = 200;

let xoff = 0;
let framerateP;
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(200);
    //noLoop();
    pixelDensity(1);
    framerateP = createP('');
}

function draw() {
    //firstTest()
    //sinColor()
    //cowTexture();
    threeDPerlinNoise();
}

function firstTest() {
    background(200);
    fill(255);
    beginShape();
    let yoff = xoff;
    for (let i = 0; i < canvasWidth; i++) {
        yoff = yoff + 0.001;
        let y = map(noise(yoff),0, 1, 0, canvasHeight);
        vertex(i, y);
        //ellipse(i, noise(xoff)*canvasHeight, 1, 1);
    }
    xoff += 0.005;
    vertex(canvasWidth, canvasHeight);
    vertex(0, canvasHeight);
    endShape(CLOSE);
}

function sinColor() {
    noStroke();
    let noiseScale = 0.01;
    let rectSize = 5;
    for (let x = 0; x < canvasWidth; x+=rectSize) {
        for (let y = 0; y < canvasHeight; y+=rectSize) {
            noiseDetail(1,1);
            let rand = map(noise(x*noiseScale, y*noiseScale), 0, 1, 0, Math.PI);

            let r = map(Math.abs(Math.sin(rand)), 0, 1, 0, 255);
            let g = map(Math.abs(Math.sin(2*rand)), 0, 1, 0, 255);
            let b = map(Math.abs(Math.sin(4*rand)), 0, 1, 0, 255);
            fill(r, g, b);
            rect(x, y, rectSize, rectSize);
        }
    }
}

let zoff = 0;

function cowTexture() {
    noStroke();
    let noiseScale = 0.01;
    let rectSize = 2;
    for (let x = 0; x < canvasWidth; x+=rectSize) {
        for (let y = 0; y < canvasHeight; y+=rectSize) {
            //noiseDetail(1,0.01);
            let rand = noise(x*noiseScale, y*noiseScale, zoff*noiseScale) * 1;

            rand -= Math.floor(rand);

            /*if (rand < 0.2)
                fill(234,242,227,255);
            else if (rand < 0.4)
                fill(97,232,225,255);
            else if (rand < 0.6)
                fill(242,87,87,255);
            else if (rand < 0.8)
                fill(242,232,99,255);
            else
                fill(242,205,96,255);*/
            if (rand < 0.5)
                fill(0);
            else
                fill(255);
            rect(x, y, rectSize, rectSize);
        }
    }
    z+=1;
}


function threeDPerlinNoise() {
    let yoff = 0;
    loadPixels();
    for (let y = 0; y < canvasHeight; y++) {
        let xoff = 0;
        for (let x = 0; x < canvasWidth; x++) {
            let rand = noise(xoff, yoff, zoff);

            rand = rand * 10;
            rand -= floor(rand);

            let r, g, b;
            if (rand < 0.2) {
                r = 234;
                g = 242;
                b = 227;
            } else if (rand < 0.4) {
                r = 97;
                g = 232;
                b = 225;
            } else if (rand < 0.6) {
                r = 242;
                g = 87;
                b = 87;
            } else if (rand < 0.8) {
                r = 242;
                g = 232;
                b = 99;
            } else {
                r = 242;
                g = 205;
                b = 96;
            }

            let index = (x + y*canvasWidth)*4;
            pixels[index+0] = r;
            pixels[index+1] = g;
            pixels[index+2] = b;
            pixels[index+3] = 255;
            xoff+=0.01;
        }
        yoff+=0.01;
    }
    zoff+=0.01;
    updatePixels();
    framerateP.html(floor(frameRate()));
}

