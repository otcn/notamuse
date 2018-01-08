/* VARIABLES */
var myNav = $('.nav-container');
var myBurger = $('.nav-mobile-icon');
var myIntro = $('.intro-container');
var myInterview = $('.interview-container');

/* GLOBAL FUNCTIONS */

function closeMobileNav() { // for mobile only
  myBurger = $('.nav-mobile-icon');
  myNav = $('.nav-container');
  myIntro = $('.intro-container');

    myBurger.removeClass('open');
    myNav.addClass('hidden');
    myIntro.addClass('hidden');
};

function openMobileNav() { // for mobile only
  myBurger = $('.nav-mobile-icon');
  myNav = $('.nav-container');

    myBurger.addClass('open');
    myNav.removeClass('hidden');
};


/* on mobile: hide address bar / go fullscreen */
window.onload = function() { setTimeout(function() { window.scrollTo(0, 1); }, 0); }

/* the stuff above and the stuff below are doing the same thing i guess, but i am not sure which one i like better yet */

$(document).ready(function() {
  // When ready...
  window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);
  });

    $(window).on("resize", function (e) {
        checkScreenSize();
    });

    checkScreenSize();

    function checkScreenSize(){
      var breakpoint = 900;
      var newWindowWidth = $(window).width();
      if (newWindowWidth < breakpoint) {
        console.log( 'checkScreenSize: BELOW ' + breakpoint );
        myNav.addClass('overlay');
      }
      else
      {
        console.log( 'checkScreenSize: OVER ' + breakpoint );
      }
    }


    /* MOBILE NAV HEADER */
    /* close and open navigation and do other fun stuff */
    $('.nav-mobile-icon').click(function() {
      console.log( 'nav-mobile-icon clicked ' );
        var myBurger = $(this);
        if (myBurger.is('.open')) {
            closeMobileNav();
            if ( myIntro.not('.hidden') ) {
                //closeSeparator();
            }
        } else {
            openMobileNav();
        }
    });

}); // closing function: "$(document).ready"
