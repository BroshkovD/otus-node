const wrapper = require('./index')
const three = require('../fixtures.json')

let drawTreeMock


beforeEach(() => drawTreeMock = jest.spyOn(wrapper, 'drawTree'))
afterEach(() => drawTreeMock = drawTreeMock.mockRestore())

describe('test print-tree', () => {
    it('should call recursive function times', () => {
        expect(drawTreeMock).toHaveBeenCalledTimes(drawTreeMock.mock.calls.length)
    })

    it('should first call function with arguments', () => {
        wrapper.drawTree(three)
        expect(drawTreeMock.mock.calls[0][0]).toBe(three)
    })


    it('should last call function with arguments', () => {
        wrapper.drawTree(three)
        expect(drawTreeMock.mock.lastCall[0]).toBe(three.items[three.items.length - 1])
    })

})