// Thay service worker cũ của repo Do-choi-coc-dong: xóa bộ nhớ offline cũ, tự gỡ, mở lại trang để chuyển sang địa chỉ mới
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('do-choi-')).map(k => caches.delete(k)));
    await self.registration.unregister();
    const list = await self.clients.matchAll({ type: 'window' });
    list.forEach(c => c.navigate('https://vietnq88.github.io/do-choi/'));
  })());
});
