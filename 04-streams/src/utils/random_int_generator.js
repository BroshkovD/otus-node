function* randomNumberGenerator(maxNumber, separator) {
    while (true) {
        yield Math.ceil(Math.random() * maxNumber).toString() + separator
    }
}

module.exports = randomNumberGenerator