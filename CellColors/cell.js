class Cell {

    constructor(x, y, i) {
        this.x = x;
        this.y = y;
        this.i = i;
        this.r = Cell.randomColor();
        this.g = Cell.randomColor();
        this.b = Cell.randomColor();
    }

    show() {
        fill(parseInt(this.r, 2), parseInt(this.g, 2), parseInt(this.b, 2));
        rect(this.x, this.y, Cell.width, Cell.height);
        fill(0, 0, 0);
    }

    mutate() {
        if (Math.random() <= Cell.mutationChance) {
            let colorChoose = Math.floor(Math.random() * 3);
            let position = Math.floor(Math.random() * 8);
            switch (colorChoose){
                case 0:
                    if (this.r.charAt(position) === '1')
                        this.r = this.r.substr(0, position) + '0' + this.r.substr(position+1);
                    else
                        this.r = this.r.substr(0, position) + '1' + this.r.substr(position+1);
                    break;
                case 1:
                    if (this.g.charAt(position) === '1')
                        this.g = this.g.substr(0, position) + '0' + this.g.substr(position+1);
                    else
                        this.g = this.g.substr(0, position) + '1' + this.g.substr(position+1);
                    break;
                case 2:
                    if (this.b.charAt(position) === '1')
                        this.b = this.b.substr(0, position) + '0' + this.b.substr(position+1);
                    else
                        this.b = this.b.substr(0, position) + '1' + this.b.substr(position+1);
                    break;
            }
        }
    }

    get finess() {
        let referenceValue = 255*3;
        return (100*referenceValue)/(Math.abs(referenceR-this.r)+Math.abs(referenceG-this.g)+Math.abs(referenceB-this.b));
    }

    static randomColor() {
        var text = "";
        var possible = "01";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    get color() {
        return parseInt(this.r, 2)+", "+ parseInt(this.g, 2)+", "+ parseInt(this.b, 2);
    }

    // Constants
    static get width() {
        return 100;
    }

    static get height() {
        return 20;
    }

    static get mutationChance() {
        return slider.value()/100;
    }
}