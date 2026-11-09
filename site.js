(function(){
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Full size image');
  var li=document.createElement('img');li.alt='';lb.appendChild(li);document.body.appendChild(lb);
  function close(){lb.classList.remove('on');li.removeAttribute('src');document.body.style.overflow='';}
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-zoom]');
    if(t){e.preventDefault();li.src=t.getAttribute('data-full')||t.currentSrc||t.src;lb.classList.add('on');document.body.style.overflow='hidden';return;}
    if(e.target.closest('.lb'))close();
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  function sel(b){tabs.forEach(function(x){var on=x===b;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;
    var p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on;});}
  tabs.forEach(function(b,i){b.tabIndex=i?-1:0;b.addEventListener('click',function(){sel(b);});
    b.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!k)return;var n=tabs[(i+k+tabs.length)%tabs.length];sel(n);n.focus();});});
  function fromHash(){var pre=document.getElementById('t-'+(location.hash||'').slice(1));if(pre)sel(pre);}
  fromHash();window.addEventListener('hashchange',fromHash);
  var vids=[].slice.call(document.querySelectorAll('video[data-auto]'));
  vids.forEach(function(v){v.addEventListener('click',function(){if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}else{v.pause();}});});
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!still&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      if(en.isIntersecting){var p=en.target.play();if(p&&p.catch)p.catch(function(){});}else{en.target.pause();}
    });},{threshold:.4});
    vids.forEach(function(v){io.observe(v);});
  }
})();
