self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.showNotification('New location has been added', {
            lang: 'en',
            body: 'New location has been successfully save to the DB',
        })
    )
})