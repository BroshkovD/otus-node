const fs = require('fs')
const { Readable, pipeline } = require('stream')
const { promisify } = require('util')
const { resolve } = require('path')
const randomNumberGenerator = require('./random_int_generator')

const MB = 1024 * 1024

const pipelineAsync = promisify(pipeline)

class DataGenerator extends Readable {
    constructor(maxNumber, maxSize, separator) {
        super();
        this._maxNumber = maxNumber;
        this._maxSize = maxSize * MB;
        this._currentSize = 0;
        this._separator = separator;
    }

    _read() {
        const chunk = Buffer.from(
            randomNumberGenerator(this._maxNumber, this._separator).next().value
        );

        this.push(chunk);

        this._currentSize += chunk.byteLength;
        if (this._maxSize < this._currentSize) {
            this.push(null);
        }
    }
}

exports.file_generator = async(filePath, size, maxNumber, separator) => {
    try {
        const dg = new DataGenerator(maxNumber, size, separator)

        if (!fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath)
        }

        const ws = fs.createWriteStream(`${filePath}/numbers.txt`)
        await pipelineAsync(dg, ws)
        const stat = await fs.promises.stat(filePath)
        return { size: stat.size, path: resolve(`${filePath}/numbers.txt`), separator: separator }
    } catch (err) {
        return err;
    }
}