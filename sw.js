// Service Worker do JOMI — existe só pra permitir notificações no Android
// (o Chrome para Android exige um Service Worker para exibir notificações;
// não usamos push de servidor, só notificações locais disparadas pelo próprio app)

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// clicar na notificação foca a aba do JOMI já aberta, ou abre uma nova
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
