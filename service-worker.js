const version = 3;

const cachedFiles = [
"/",
"index.html",
"app.js",
"pwa-tv-catalog-logo-256.png",
"pwa-tv-catalog-logo-512.png",
"ios-icon-192.png",
"styles.css"
];

self.addEventListener("install", function(){
    console.log("service worker installed");
})

self.addEventListener("activate", function(){
    caches.open("pwa-tv-catalog-archives-" + version).then(cache => {
        cache.addAll(cachedFiles)
            .then(function(){
                caches.delete("pwa-tv-catalog-archives-" + (version - 1 ));   
                caches.delete("pwa-tv-catalog-archives");
            });
        
    });
});


self.addEventListener("fetch", function(event) {
    const request = event.request
    const promiseResponse = caches.match(request).then(cacheResponse => {
        const response = cacheResponse ? cacheResponse : fetch(request);
        return response;
    });

    event.respondWith(promiseResponse);

});
