const fs = require('fs')
const fg = require('./utils/file_generator')
const fd = require('./utils/file_divider')
const fj = require('./utils/file_join')

const SEPARATOR = ','
const PATH = `${__dirname}/tmp`

hw2 = async() => {
    try {

        await fs.rmdir(PATH, err => err)

        const file = await fg.file_generator(
            PATH,
            10,
            1000000,
            SEPARATOR
        )
        const filesList = await fd.file_divider(file.path, file.separator, `${PATH}/files`)

        const resultFile = await fj.file_join(PATH, filesList)

        console.log("result file:", resultFile)

    } catch (error) {
        throw new Error(error)
    }
}

hw2()