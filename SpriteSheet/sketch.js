
let sprites = []

let catJson, shroomJson;
let catImg, shroomImg;

function preload() {
    catJson = loadJSON("sprites/cat.json")
    catImg = loadImage("sprites/cat.png")

    shroomJson = loadJSON("sprites/shroom.json")
    shroomImg = loadImage("sprites/shroom.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let framesCat = Sprite.loadFrames(catImg, catJson)
    let framesShroom = Sprite.loadFrames(shroomImg, shroomJson)

    for (let i = 0; i < windowHeight - 256; i += 256) {
        if (random() > 0.6) {
            sprites.push(new Sprite(framesCat, 0, i, random(0.1, 1)))
        } else {
            sprites.push(new Sprite(framesShroom, 0, i, random(0.1, 1)))
        }
        
    }
}

function draw() {
    background(0)
    for (sprite of sprites) {
        sprite.animate()
        sprite.show()
    }
}
