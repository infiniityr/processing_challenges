const MAX_CAPACITY = 4;

let quadtree;
let boundarySearch;

function setup() {
    createCanvas(800, 800);

    let boundary = new Boundary(400, 400, 400, 400);
    quadtree = new Quadtree(boundary, MAX_CAPACITY);

    for (let i = 0; i < 100000; i++) {
        let x = randomGaussian(width/2, height/8);
        let y = randomGaussian(height/2, width/8);
        quadtree.insert(new Point(x, y));
    }


    boundarySearch = new Boundary(randomGaussian(width/2, height/8), randomGaussian(height/2, width/8), randomGaussian(width/8, height/16), randomGaussian(height/8, width/16));
    noLoop();
}


function draw() {
    drawQuad(quadtree);
    stroke(255, 0, 0);
    noFill();
    rectMode(CENTER);
    rect(boundarySearch.x, boundarySearch.y, boundarySearch.halfWidth*2, boundarySearch.halfHeight*2);
    let results = quadtree.queryRange(boundarySearch);
    strokeWeight(3);
    for (let i = 0; i < results.length; i++) {
        point(results[i].x, results[i].y);
    }
}

function drawQuad(quad) {
    stroke(0);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(quad.boundary.x, quad.boundary.y, quad.boundary.halfWidth*2, quad.boundary.halfHeight*2);

    strokeWeight(3);
    for (let i = 0; i < quad.points.length; i++) {
        point(quad.points[i].x, quad.points[i].y);
    }
    if (quad.northWest !== null) {
        drawQuad(quad.northWest);
        drawQuad(quad.northEast);
        drawQuad(quad.southWest);
        drawQuad(quad.southEast);
    }
}