// TODO
// Ask for location - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
// Enable Push API - https://developer.mozilla.org/en-US/docs/Web/API/Push_API
// Setup websocket and input filed from index html
// After adding new location to JSON file send push notification


const express = require('express')
const path = require('path')

const app = express()

app.use('/', express.static(path.join(__dirname, 'assets')))


app.listen(3000, () => console.log('Hello from 3000'))