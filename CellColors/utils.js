String.prototype.crossover = function (string2) {
    let resultString = "";
    for (let i = 0; i < Math.min(this.length, string2.length); i++) {
        if (Math.random() < 0.5)
            resultString += this.charAt(i);
        else
            resultString += string2.charAt(i);
    }
    return resultString;
};