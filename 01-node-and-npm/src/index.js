const wrapper = {
    drawTree: (tree, index = 1, items = null, level = 1) => {
        let indent = ' '
        let prefix = ''
        let postfix = ''

        if (level === 2) {
            const isLastNode = index === items.length - 1
            prefix = isLastNode ? '└── ' : '├── '
        }
        if (level > 2) {
            indent = ' '.repeat(level * 4 - 8)
            prefix = '|'
            postfix = '└── '
        }

        console.log('\n', prefix + indent + postfix + tree.name)

        if ('items' in tree) {
            tree.items.forEach((item, index, array) => {
                wrapper.drawTree(item, index, array, level + 1)
            })
        }
    }
}

module.exports = wrapper