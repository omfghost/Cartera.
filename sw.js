const V='cv11-3-1779619137';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./index.html','./manifest.json'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('stooq')||u.includes('coingecko')||u.includes('frankfurter')||u.includes('allorigins')||u.includes('yahoo')||
     u.includes('corsproxy')||u.includes('codetabs')||u.includes('thingproxy')||
     u.includes('cors.dev')||u.includes('cors.sh')||u.includes('cors-anywhere')||
     u.includes('workers.dev')){
    e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return;
  }
  e.respondWith(fetch(e.request).then(res=>{
    if(res.ok){const cl=res.clone();caches.open(V).then(c=>c.put(e.request,cl));}return res;
  }).catch(()=>caches.match(e.request).then(hit=>hit||caches.match('./index.html'))));
});
