// Hide Header on scroll down
// source: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
$(document).ready(function() {
  console.log('mobilenav.js');

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var myNav = $('.nav-container')
  var navbarHeight = myNav.outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      //console.log( 'window-scrollTop: ' + $(document).scrollTop() );
      if (didScroll) {
          //console.log('didScroll');
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();
      console.log( st );

      // Make sure they scroll more than delta
      if( Math.abs(lastScrollTop - st) <= delta )
          return; // stops function if scrolled value is smaller than delta

      // If they scrolled down and are past the navbar, add class .hidden.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          myNav.addClass('hidden');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              myNav.removeClass('hidden');
          }
      }

      lastScrollTop = st;
  }
}); // closing function: "$(document).ready"