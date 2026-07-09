/* MEDICAL BLOOM v2 — shared behaviour */
(function(){
  var head=document.querySelector('.site-head');
  function onScroll(){ if(head) head.classList.toggle('on', window.scrollY>30); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* mobile menu */
  var mm=document.querySelector('.m-menu');
  function setMenu(open){ if(!mm) return; mm.classList.toggle('open',open); document.body.style.overflow=open?'hidden':''; }
  document.querySelectorAll('.allmenu-btn,.burger').forEach(function(b){ b.addEventListener('click',function(){ setMenu(!mm.classList.contains('open')); }); });
  var mclose=document.querySelector('.m-menu .m-close');
  if(mclose){ mclose.addEventListener('click',function(){ setMenu(false); }); }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') setMenu(false); });

  /* language dropdown */
  var lang=document.querySelector('.lang');
  if(lang){
    lang.querySelector('button').addEventListener('click',function(e){ e.stopPropagation(); lang.classList.toggle('open'); });
    document.addEventListener('click',function(){ lang.classList.remove('open'); });
  }

  /* reveal */
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* ---------- left page indicator with descending flower ---------- */
  var main=document.querySelector('main');
  if(main && window.matchMedia('(min-width:1241px)').matches){
    var secs=[].slice.call(main.children).filter(function(el){
      return el.tagName==='SECTION' || el.tagName==='NAV' ? el.tagName==='SECTION' : false;
    });
    if(secs.length>=3){
      var pind=document.createElement('div'); pind.className='pind';
      var track=document.createElement('div'); track.className='track';
      var IMGPFX=document.body.getAttribute('data-pfx')||'';
      secs.forEach(function(s,i){
        var d=document.createElement('button'); d.className='dot'; d.style.top=(i/(secs.length-1)*100)+'%';
        d.setAttribute('aria-label','section '+(i+1));
        d.addEventListener('click',function(){ s.scrollIntoView({behavior:'smooth'}); });
        track.appendChild(d);
      });
      var fl=document.createElement('div'); fl.className='flower'; fl.style.top='0%';
      fl.innerHTML='<img src="'+IMGPFX+'img/logo_flower_rose.png" alt="">';
      track.appendChild(fl);
      var lbl=document.createElement('div'); lbl.className='plabel'; lbl.textContent='MEDICAL BLOOM';
      pind.appendChild(track); pind.appendChild(lbl);
      document.body.appendChild(pind);
      var dots=track.querySelectorAll('.dot');
      function upd(){
        var mid=window.scrollY+window.innerHeight*0.45, idx=0;
        secs.forEach(function(s,i){ if(s.offsetTop<=mid) idx=i; });
        // progress within current section for smooth travel
        var s=secs[idx], nextTop=(secs[idx+1]?secs[idx+1].offsetTop:document.body.scrollHeight);
        var p=Math.min(1,Math.max(0,(mid-s.offsetTop)/Math.max(1,nextTop-s.offsetTop)));
        var pos=((idx+p)/(secs.length-1))*100;
        fl.style.top=Math.min(100,pos)+'%';
        dots.forEach(function(d,i){ d.classList.toggle('on',i===idx); });
      }
      window.addEventListener('scroll',upd,{passive:true}); upd();
    }
  }

  /* ---------- petal cursor trail ---------- */
  if(window.matchMedia('(pointer:fine)').matches){
    var last=0, tones=['#C2A3A3','#D4B8B8','#B7A99D','#E7D8D8'];
    document.addEventListener('mousemove',function(e){
      var now=Date.now(); if(now-last<55) return; last=now;
      var p=document.createElement('div'); p.className='petal';
      var size=7+Math.random()*9;
      p.style.width=size+'px'; p.style.height=size+'px';
      p.style.left=(e.clientX-size/2+(Math.random()*14-7))+'px';
      p.style.top=(e.clientY-size/2+(Math.random()*10-5))+'px';
      p.style.background=tones[Math.floor(Math.random()*tones.length)];
      p.style.setProperty('--px',(Math.random()*56-28)+'px');
      p.style.setProperty('--py',(28+Math.random()*52)+'px');
      p.style.setProperty('--pr',(Math.random()*360)+'deg');
      p.style.setProperty('--ps',(90+Math.random()*220)+'deg');
      p.style.setProperty('--pd',(1.1+Math.random()*0.9)+'s');
      document.body.appendChild(p);
      setTimeout(function(){ p.remove(); },2200);
    },{passive:true});
  }

  /* back button */
  var bk=document.querySelector('.back-fab');
  if(bk){ bk.addEventListener('click',function(){
    if(history.length>1 && document.referrer!==''){ history.back(); }
    else{ location.href=bk.getAttribute('data-home')||'../index.html'; }
  }); }

  /* keep site alive on browser back (index pages only) */
  if(document.body.hasAttribute('data-home-trap')){
    try{
      history.pushState({mb:1},'');
      window.addEventListener('popstate',function(e){
        if(!e.state||!e.state.mb){ history.pushState({mb:1},''); window.scrollTo({top:0,behavior:'smooth'}); }
      });
    }catch(err){}
  }

  /* hero countdown */
  var cd=document.getElementById('mb-countdown');
  if(cd){
    var endCfg=null; try{ endCfg=JSON.parse(localStorage.getItem('mb_promo_end')); }catch(e){}
    var end=endCfg?new Date(endCfg):(function(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth()+1,0,23,59,59); })();
    var cells=cd.querySelectorAll('b');
    function tick(){
      var d=Math.max(0,end-new Date());
      var dd=Math.floor(d/86400000), hh=Math.floor(d/3600000)%24, mm2=Math.floor(d/60000)%60, ss=Math.floor(d/1000)%60;
      var v=[dd,hh,mm2,ss];
      cells.forEach(function(c,i){ var t=String(v[i]).padStart(2,'0'); if(c.textContent!==t) c.textContent=t; });
    }
    tick(); setInterval(tick,1000);
  }

  /* ---------- admin-driven config ---------- */
  function cfg(key,def){ try{ var v=localStorage.getItem(key); return v?JSON.parse(v):def; }catch(e){ return def; } }
  window.MB_CFG=cfg;

  /* event popup carousel (index pages have #mb-popup) */
  var dim=document.getElementById('mb-popup');
  if(dim){
    var pc=cfg('mb_popup',{enabled:true});
    var hideUntil=+(localStorage.getItem('mb_popup_hide')||0);
    if(pc.enabled!==false && Date.now()>hideUntil){
      setTimeout(function(){ dim.classList.add('show'); },500);
    }
    var slides=[].slice.call(dim.querySelectorAll('.pc-slide'));
    var dots=[].slice.call(dim.querySelectorAll('.pc-dots button'));
    var tab=dim.querySelector('.pc-tab');
    var cur=0,n=slides.length,timer=null;
    function apply(){
      slides.forEach(function(sl,i){
        sl.className='pc-slide '+(i===cur?'cur':(i===(cur-1+n)%n?'prev':(i===(cur+1)%n?'next':'hidden')));
      });
      dots.forEach(function(d,i){ d.classList.toggle('on',i===cur); });
      if(tab) tab.textContent=slides[cur].getAttribute('data-tab')||'';
    }
    function go(i){ cur=(i+n)%n; apply(); resetAuto(); }
    function resetAuto(){ clearInterval(timer); timer=setInterval(function(){ cur=(cur+1)%n; apply(); },5000); }
    if(n){ apply(); resetAuto(); }
    dim.querySelector('.pc-arrow.l').addEventListener('click',function(){ go(cur-1); });
    dim.querySelector('.pc-arrow.r').addEventListener('click',function(){ go(cur+1); });
    dots.forEach(function(d,i){ d.addEventListener('click',function(){ go(i); }); });
    slides.forEach(function(sl,i){ sl.addEventListener('click',function(){ if(i!==cur){ go(i); } }); });
    var sx=null;
    dim.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; },{passive:true});
    dim.addEventListener('touchend',function(e){ if(sx===null) return; var dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>44){ go(cur+(dx<0?1:-1)); } sx=null; },{passive:true});
    dim.querySelector('.pclose').addEventListener('click',function(){
      if(dim.querySelector('input[type=checkbox]').checked){ localStorage.setItem('mb_popup_hide', Date.now()+86400000); }
      dim.classList.remove('show'); clearInterval(timer);
    });
    dim.addEventListener('click',function(e){ if(e.target===dim) { dim.classList.remove('show'); clearInterval(timer);} });
  }

  /* promo banner visibility (admin-driven) */
  var pg=document.getElementById('mb-promogrid');
  if(pg){
    var show=cfg('mb_promos',null);
    if(Array.isArray(show)){
      [].forEach.call(pg.children,function(el,i){ el.style.display=show.indexOf(i)>-1?'':'none'; });
    }
  }

  /* notices added via admin (board page has #mb-board) */
  var board=document.getElementById('mb-board');
  if(board){
    var extra=cfg('mb_notices',[]);
    extra.slice().reverse().forEach(function(n){
      var a=document.createElement('a'); a.className='row';
      a.innerHTML='<span class="tag">'+(n.tag||'공지')+'</span><span class="bt"></span><span class="bm"></span>';
      a.querySelector('.bt').textContent=n.title;
      a.querySelector('.bm').textContent=(n.author||'관리자')+' · '+(n.date||'');
      if(n.content){ a.href='javascript:;'; a.addEventListener('click',function(){ alert(n.title+'\n\n'+n.content); }); }
      board.insertBefore(a, board.firstChild);
    });
  }
})();
