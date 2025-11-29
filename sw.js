
// Service Worker (sw.js)

self.addEventListener('push', event => {
  const data = event.data.json();
  
  const title = data.title || 'ART App Alert';
  const options = {
    body: data.body,
    icon: 'https://img.freepik.com/premium-vector/mining-dump-truck-vector-illustration-isolated-white-background_263357-365.jpg',
    badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Vale_logo.svg/800px-Vale_logo.svg.png',
    tag: data.tag || 'art-notification',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
