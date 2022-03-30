if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js')
      .then((reg)=>console.log('registred successfully',reg))
      .catch((error)=>console.log('registration failed',error))

}
//installing
const cacheName='rolex-v2'
const cacheAssets = [
    '/',
    './index.html',
    './assets/img/favicon.png',
    'https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css',
    './assets/css/swiper-bundle.min.css',
    
    './assets/css/styles.css',
    './assets/img/featured1.png',
    './assets/img/featured3.png',
    './assets/img/new1.png',
    './assets/img/home.png',
    'https://www.facebook.com/',
    'https://twitter.com/',
    'https://www.instagram.com/',
    './assets/img/featured1.png',
    './assets/img/featured2.png',
    './assets/img/featured3.png',
    './assets/img/story.png',
    './assets/img/product1.png',
    './assets/img/product2.png',
    './assets/img/product3.png',
    './assets/img/product4.png',
    './assets/img/product5.png',
    './assets/img/testimonial1.jpg',
    './assets/img/testimonial2.jpg',
    './assets/img/testimonial3.jpg',
    './assets/img/testimonial.png',
    './assets/img/new1.png',
    './assets/img/new2.png',
    './assets/img/new3.png',
    './assets/img/new4.png',
    './assets/js/swiper-bundle.min.js',
    './assets/js/main.js'
   

];
self.addEventListener('install',evt=>{
    // console.log('service installed')
    evt.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log('caching files')
            cache.addAll(cacheAssets)
            .then(() => self.skipWaiting())
        })
    );
    
})
//Activate Service_worker
self.addEventListener('activate',evt=>{
    evt.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys
                .filter(key => key!==cacheName)
                .map(key => caches.delete(key))
            )
        })

        
    )
})
//fetch
self.addEventListener('fetch',evt=>{
    //console.log('fetch event:',evt)
    evt.respondWith(
        caches.match(evt.request).then(res=>{
            return res || fetch(evt.request)
        })
    );




})
// self.addEventListener('push', function(e) {
//     console.log('bhbh')
//     var options = {
//       body: 'This notification was generated from a push!',
//       icon: './assets/img/fast-food-12.png',
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: '2'
//       },
//       actions: [
//         {action: 'explore', title: 'Explore this new world',
//           icon: './assets/img/about.jpg'},
//         {action: 'close', title: 'Close',
//           icon: './assets/img/home.png'},
//       ]
//     };
//     e.waitUntil(
//       self.registration.showNotification('Hello world!', options)
//     );
//   });
