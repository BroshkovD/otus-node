const fs = require('fs')

function joinFiles(srcDir, files) {
    return new Promise((res) => {
        const resultFilePath = `${srcDir}/sorted_numbers.txt`

        const writable = fs.createWriteStream(resultFilePath)

        const streams = files.map((file, index) => {
            const readable = fs.createReadStream(file)

            readable.on('data', (chunk) => {
                writable.write(chunk)
            })

            readable.on('end', () => {
                if (streams[index + 1]) {
                    streams[index + 1].resume()
                }
            })

            return readable
        })

        streams[0].resume()

        res(resultFilePath)
    })
}

exports.file_join = joinFiles