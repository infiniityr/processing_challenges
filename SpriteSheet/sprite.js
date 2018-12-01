class Frame {
    constructor (obj) {
        if (obj) {
            this.name = obj.name
            this.position = obj.position
        }
        this.img = undefined
    }

    loadFrame (image) {
        this.img = image.get(this.position.x, this.position.y, this.position.w, this.position.h)
    }
}

class Sprite {

    constructor (frames, x, y, speed) {
        this.frames = frames
        this.x = x
        this.y = y
        this.speed = speed
        this.index = 0
    }

    show () {
        let index = floor(this.index) % this.frames.length
        image(this.frames[index].img, this.x, this.y);
    }

    animate () {
        this.index += this.speed;
        this.x += this.speed * 10;

        if (this.x > windowWidth) {
            this.x = -this.frames[0].position.w;
        }
    }

    static loadFrames(image, json) {
        let frames = []
        for (let i = 0; i < json.frames.length; i++) {
            let f = new Frame(json.frames[i])
            f.loadFrame(image)
            frames.push(f)
        }
        return frames
    }
}
