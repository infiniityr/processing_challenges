class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Boundary {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.halfWidth = w;
        this.halfHeight = h;
    }

    containsPoint(p) {
        if (p.x < this.x - this.halfWidth) return false;
        if (p.x > this.x + this.halfWidth) return false;
        if (p.y < this.y - this.halfHeight) return false;
        if (p.y > this.y + this.halfHeight) return false;
        return true;
    }

    intersects(boundary) {
        return !(boundary.x - boundary.halfWidth > this.x + this.halfWidth ||
            boundary.x + boundary.halfWidth < this.x - this.halfWidth ||
            boundary.y - boundary.halfHeight > this.y + this.halfHeight ||
            boundary.y + boundary.halfHeight < this.y - this.halfHeight);
    }
}

class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
    }

    insert(p) {
        if (!this.boundary.containsPoint(p)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(p);
            return true;
        }

        if (this.northWest === null) {
            this.subdivide();
        }
        if (this.northWest.insert(p)) return true;
        if (this.northEast.insert(p)) return true;
        if (this.southWest.insert(p)) return true;
        if (this.southEast.insert(p)) return true;
        return false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let halfHeight = this.boundary.halfHeight;
        let halfWidth = this.boundary.halfWidth;
        this.northWest = new Quadtree(new Boundary(x - halfWidth/2, y + halfHeight/2, halfWidth/2, halfHeight/2), this.capacity);
        this.northEast = new Quadtree(new Boundary(x + halfWidth/2, y + halfHeight/2, halfWidth/2, halfHeight/2), this.capacity);
        this.southWest = new Quadtree(new Boundary(x - halfWidth/2, y - halfHeight/2, halfWidth/2, halfHeight/2), this.capacity);
        this.southEast = new Quadtree(new Boundary(x + halfWidth/2, y - halfHeight/2, halfWidth/2, halfHeight/2), this.capacity);
    }

    queryRange(range) {
        let pointsInRange = [];
        if (!this.boundary.intersects(range)) {
            return pointsInRange;
        }

        for (let i = 0; i < this.points.length; i++) {
            if (range.containsPoint(this.points[i])) {
                pointsInRange.push(this.points[i]);
            }
        }

        if (this.northWest === null) {
            return pointsInRange;
        }

        return [
            ...pointsInRange,
            ...this.northWest.queryRange(range),
            ...this.northEast.queryRange(range),
            ...this.southWest.queryRange(range),
            ...this.southEast.queryRange(range)
        ]
    }
}