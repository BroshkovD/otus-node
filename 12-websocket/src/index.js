// TODO
// Add Pin on Maps and centering in the new locations
// Draw a L.polygon from array from file
// Enable Push API - https://developer.mozilla.org/en-US/docs/Web/API/Push_API
// Setup websocket and input filed from index html
// After adding new location to JSON file send push notification


const express = require('express')
const fs = require('fs')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = app.listen(3000, () => console.log('Hello from 3000'))

const io = new Server(server)
const locationStoragePath = './assets/locations.json'

const writeToFile = (content) => {
    try {
        fs.appendFileSync(path.join(__dirname, locationStoragePath), JSON.stringify(content) + ',')
    } catch (err) {
        console.error(err)
    }
}

io.on('connection', (socket) => {
    socket.on('user location', (location) => {
        console.log('location: ', location)
        writeToFile(location)

    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})


app.use('/', express.static(path.join(__dirname, 'assets')))