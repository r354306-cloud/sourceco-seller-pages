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
  var vids=[].slice.call(document.querySelectorAll('video[data-auto]'));
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!still&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      if(en.isIntersecting){var p=en.target.play();if(p&&p.catch)p.catch(function(){});}else{en.target.pause();}
    });},{threshold:.4});
    vids.forEach(function(v){io.observe(v);});
  }
})();
