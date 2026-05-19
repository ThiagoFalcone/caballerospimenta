(function(){
  // Page transition fade
  document.addEventListener('DOMContentLoaded', function(){
    document.body.style.opacity = '0';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        document.body.style.opacity = '';
      });
    });
  });

  function navigateTo(href){
    document.body.classList.add('page-leaving');
    setTimeout(function(){ window.location.href = href; }, 360);
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || a.target === '_blank') return;
    e.preventDefault();
    navigateTo(href);
  });

  // Hamburger menu
  var hamburger=document.getElementById('nav-hamburger');
  var menu=document.getElementById('mobile-menu');
  if(!hamburger||!menu) return;

  hamburger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
  });

  menu.querySelectorAll('a[href]').forEach(function(a){
    var href=a.getAttribute('href');
    var path=location.pathname;
    if(path===('/'+href)||path.endsWith('/'+href)||
       (href==='index.html'&&(path==='/'||path.endsWith('/index.html')))){
      a.classList.add('mm-active');
    }
  });
})();
