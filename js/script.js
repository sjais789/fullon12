$(document).ready(function(){
  $(function(){
 var shrinkHeader = 130;
  $(window).scroll(function() {
  var scroll = getCurrentScroll();
    if ( scroll >= shrinkHeader ) {
       $('.navbar').css("width",'100%');
       $('.navbar .navbar-brand').css("display",'block');
       $('.navbar-brand.navbrand-top').css("display",'none');
       $('nav').addClass('fixed-top');
       $('.navbar .nav-item .nav-link').css('padding','1rem 2rem')
    }
    else {
       $('.navbar').css("width",'70%');
       $('.navbar .navbar-brand').css("display",'none');
       $('.navbar-brand.navbrand-top').css("display",'block');
       $('nav').removeClass('fixed-top');
       $('.navbar .nav-item .nav-link').css('padding','1.5rem 3rem')
    }
  });
          function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
  }
});
});

$('.nav-item a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});