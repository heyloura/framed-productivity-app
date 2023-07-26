let version = '0.0.10';

// Cache IDs
let coreID = `${version}_core`;
let pageID = `${version}_pages`;
let cacheIDs = [coreID, pageID];

// Listen for the install event
self.addEventListener('install', function (event) {
  
  // Activate immediately
	self.skipWaiting();

	// Cache the offline core
	event.waitUntil(caches.open(`${version}_core`).then(function (cache) {
    cache.add(new Request('./fragments/_calendar.html'));
    cache.add(new Request('./fragments/_events.html'));
    cache.add(new Request('./fragments/_header.html'));
    cache.add(new Request('./fragments/_nav.html'));
    cache.add(new Request('./fragments/_todos.html'));
    cache.add(new Request('./fragments/_save.html'));
    cache.add(new Request('./fragments/_import.html'));
    cache.add(new Request('./styles/style.css'));
    cache.add(new Request('./scripts/disappearingFrame.js'));
    cache.add(new Request('./scripts/fragment.js'));
    cache.add(new Request('manifest.json'));
		return cache;
	}));
  
  // Cache the offline pages
	event.waitUntil(caches.open(`${version}_pages`).then(function (cache) {
		cache.add(new Request('index.html'));
    cache.add(new Request('todos.html'));
    cache.add(new Request('settings.html'));
		return cache;
	}));

});

// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {

		// Get the keys of the caches to remove
		let keysToRemove = keys.filter(function (key) {
			return !cacheIDs.includes(key);
		});

		// Delete each cache
		let removed = keysToRemove.map(function (key) {
			return caches.delete(key);
		});

		return Promise.all(removed);

	}).then(function () {
		return self.clients.claim();
	}));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      if(event.request.url.substring(event.request.url.lastIndexOf('/') + 1) === ''){
        return caches.match('index.html');
      }
      return caches.match(event.request);
    })
  );
});
