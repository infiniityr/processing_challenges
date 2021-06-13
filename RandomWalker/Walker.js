
class Walker {
    constructor({ maxHeight, maxWidth }) {
        this.maxHeight = maxHeight
        this.maxWidth = maxWidth
        this.path = []
        this.currentPos = new Point({ x: this.maxHeight / 2, y: this.maxWidth / 2 })

        this.grid = []
        for (let i = 0; i < this.maxHeight; i++) {
            for (let j = 0; j < this.maxWidth; j++) {
                if (!this.grid[i]) {
                    this.grid[i] = []
                }
                this.grid[i][j] = new Point({
                    x: i,
                    y: j
                })
            }
        }

        this.allOptions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
        ]
    }

    nextMove() {
        const options = []
        for (const option of this.allOptions) {
            let optionPoint = this.grid[this.currentPos.x + option.dx][this.currentPos.y + option.dy]
            if (this.isPointValid(optionPoint)) {
                options.push(optionPoint)
            }
        }

        const nextPos = random(options)

        if (!nextPos) { // is Stuck
            return true
        }

        nextPos.visited = true
        this.path.push(nextPos)
        this.currentPos = nextPos
        return false
    }

    isPointValid(point) {
        if (point.x < 0 || point.x > this.maxWidth || point.y < 0 || point.y > this.maxHeight) {
            return false
        }
        return !point.visited
    }
}

class Point {
    constructor ({ x, y }) {
        this.x = x
        this.y = y
        this.visited = false
    }
}