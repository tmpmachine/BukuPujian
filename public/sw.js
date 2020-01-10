self.addEventListener('message', function(e) {
  if (e.data.action == 'skipWaiting')
    self.skipWaiting();
});

var cacheVersion = '0.141';
var cacheItem = 'bukupujian-v'+cacheVersion;

self.addEventListener('install', function(event) {
  var urls = [
    '/',
    '/404.html',
    '/manifest.json',
    '/images/128.png',
    '/images/128ap.png',
    '/images/192.png',
    '/images/bg.jpeg',
    '/images/share.jpeg',
    
    'https://fonts.googleapis.com/css?family=Cousine|Telex',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SkvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SAvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SgvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_ScvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SYvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SsvzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SovzAbt.woff2',
    'https://fonts.gstatic.com/s/cousine/v12/d6lIkaiiRdih4SpP_SQvzA.woff2',
    'https://fonts.gstatic.com/s/telex/v6/ieVw2Y1fKWmIO-faDVtSKA.woff2',
    'https://fonts.gstatic.com/s/telex/v6/ieVw2Y1fKWmIO-fUDVs.woff2',
    
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    ];
 
  event.waitUntil(
    caches.open(cacheItem).then(function(cache) {
      return cache.addAll(urls);
    })
  );
  
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(c){
      c.map(function(cname){
        if (!cname.endsWith(cacheVersion))
          caches.delete(cname);
      });
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('song/') > 0) {
    e.respondWith(
      caches.match(e.request.url.split('song/')[0]).then(function(resp) {
        if (resp)
          return resp;
        
        return fetch(e.request).then(function(r) {
          return r;
        }).catch(function() {
          console.error('Check connection.');
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(resp) {
        if (resp)
          return resp;
        
        return fetch(e.request).then(function(r) {
          return r;
        }).catch(function() {
          console.error('Check connection.');
        });
      })
    );
  }
});