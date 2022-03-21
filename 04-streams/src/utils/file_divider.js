const fs = require('fs')

function splitFile(srcFile, separator, dirToSave) {
    return new Promise((res) => {

        if (!fs.existsSync(dirToSave)) {
            fs.mkdirSync(dirToSave)
        }
        const readable = fs.createReadStream(srcFile)
        const files = []

        readable.on('data', (chunk) => {
            const filePath = `${dirToSave}/${files.length}.txt`
            const writeable = fs.createWriteStream(filePath)

            const sorted = chunk.toString().split(separator).sort((a, b) => a - b)

            const splitRow = sorted.map((num, index) => {
                if (sorted[index] !== sorted[index + 1]) {
                    return num + '\n'
                }
                return num
            })

            writeable.write(splitRow.join(','), () => {
                files.push(filePath)
            })
        })

        readable.on('end', () => {
            res(files)
        })

        readable.on('error', (err) => {
            console.log('Err=>>', err)
        })

    }).catch(err => err)
}

exports.file_divider = splitFile