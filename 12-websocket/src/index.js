// TODO
// Add Pin on Maps and centering in the new locations
// Draw a L.polygon from array from file

require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const { Server } = require('socket.io')
const webPush = require('web-push')

const app = express()
const server = app.listen(3000, () => console.log('Hello from 3000'))

const io = new Server(server)
const locationStoragePath = './assets/locations.json'


if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
        "environment variables. You can use the following ones:")
    console.log(webPush.generateVAPIDKeys())
} else {
    webPush.setVapidDetails(
        'https://serviceworke.rs/',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    )
}

app.get('/' + 'vapidPublicKey', function(req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
})


const writeToFile = (content) => {
    try {
        fs.appendFileSync(path.join(__dirname, locationStoragePath), JSON.stringify(content) + ',')
    } catch (err) {
        console.error(err)
    }
}

io.on('connection', (socket) => {
    socket.on('user location', ({ latitude, longitude, subscription }) => {
        webPush.sendNotification(subscription)
            .then(function() {
                res.sendStatus(201);
            })
            .catch(function(error) {
                console.log(error);
                res.sendStatus(500);
            });

        writeToFile({ latitude, longitude })

    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})


app.use('/', express.static(path.join(__dirname, 'assets')))