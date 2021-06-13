
class Walker {
    constructor({ maxHeight, maxWidth, canVisitMultipleTimes = true }) {
        this.maxHeight = maxHeight
        this.maxWidth = maxWidth
        this.canVisitMultipleTimes = canVisitMultipleTimes
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
        let optionPoint = null
        for (const option of this.allOptions) {
            if ((optionPoint = this.isPointValid(this.currentPos.x + option.dx, this.currentPos.y + option.dy)) !== false) {
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

    isPointValid(x, y) {
        if (x <= 0 || x >= this.maxWidth || y <= 0 || y >= this.maxHeight) {
            return false
        }
        return this.canVisitMultipleTimes ? this.grid[x][y] : !this.grid[x][y].visited
    }
}

class Point {
    constructor ({ x, y }) {
        this.x = x
        this.y = y
        this.visited = false
    }
}