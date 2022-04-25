navigator.serviceWorker.register('./service-worker.js')
const socket = io()
const status = document.querySelector('#status')
const latInput = document.querySelector('#lat')
const longInput = document.querySelector('#long')
const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG1pdHJ5YnIiLCJhIjoiY2wyM2M3OWd0MDZ5ajNrcnI3cnZ5Mmx3dyJ9.e0Qnjt8qT1EpUb4fHJ6n0w'
}).addTo(map)

const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map)

function geoFindMe() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('latitude', latitude, 'longitude', longitude)
        status.textContent = '';
        latInput.value = latitude;
        longInput.value = longitude;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location'
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser'
    } else {
        status.textContent = 'Locating…'
        navigator.geolocation.getCurrentPosition(success, error)
    }

}

navigator.serviceWorker.ready
    .then(function(registration) {
        return registration.pushManager.getSubscription()
            .then(async function(subscription) {

                if (subscription) {
                    return subscription
                }

                const response = await fetch('./vapidPublicKey')
                const vapidPublicKey = await response.text()

                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidPublicKey
                })
            })
    }).then(function(subscription) {
        document.querySelector('#save-location').onclick = () => {

            if (latInput.value && longInput.value) {
                socket.emit('user location', {
                    latitude: latInput.value,
                    longitude: longInput.value,
                    subscription
                })
                latInput.value = ''
                longInput.value = ''
            }
        }

    })

document.querySelector('#find-me').addEventListener('click', geoFindMe)