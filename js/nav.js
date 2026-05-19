(function(){
  var hamburger=document.getElementById('nav-hamburger');
  var menu=document.getElementById('mobile-menu');
  if(!hamburger||!menu) return;

  hamburger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
  });

  menu.querySelectorAll('a[href]').forEach(function(a){
    a.addEventListener('click',function(){
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
    var href=a.getAttribute('href');
    var path=location.pathname;
    if(path===('/'+href)||path.endsWith('/'+href)||
       (href==='index.html'&&(path==='/'||path.endsWith('/index.html')))){
      a.classList.add('mm-active');
    }
  });
})();
