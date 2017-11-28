// TOGGLE OPEN- AND CLOSE-ICONS
$(document).ready(function() {





    /*

    $('.key-icon').siblings('a').hover(function() {
        var trigger = $(this);
        var key = trigger.siblings('.key-icon');
        key.toggleClass( 'active' );
        //trigger.siblings('.key-icon').toggle(); // un-comment later!
    });

    $('.key-icon').siblings('a').click(function() {
        var trigger = $(this);
        var key = trigger.siblings('.key-icon');
        if ( trigger.hasClass( '.active' ) ) {
            key.addClass( 'active' );
        } else {
            key.removeClass( 'active' );
        }
        key.toggleClass( 'active' );
    });
    */
});



// OLDER STUFF - NOT SURE IF STILL NEEDED:



    // STICKINESS MAIN
    /*
    var myChild;
    var myParent;
    var myParentTop;
    var scrollTop;

    $('.topic-title>a').click(function() {
      myChild = $(this);
      myParent = $(this).parent( '.topic-title' );
      $( '.topic-title.sticky' ).each(function() {
        $( this ).removeClass( 'sticky' );
      });
      if ( myChild.is( '.active' ) ) {
        myParent.removeClass('sticky');
      } else {
        //myParent.addClass('sticky');
        myParentTop = myParent.offset().top;
        console.log(myParentTop);
      }
    });

    $(window).scroll(function() {
      scrollTop = $(window).scrollTop();
      console.log(scrollTop);
      if (scrollTop > myParentTop) {
        myParent.addClass('sticky');
      } else {
        myParent.removeClass('sticky');
      }
    });
    */

    // STICKINESS NAV
    /*
    var interviewsButtonTop = $('#interviews-button').offset().top;
    var questionsButtonTop = $('#questions-button').offset().top;
    var stickyButton = function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > interviewsButtonTop) {
        $('#interviews-button').addClass('sticky');
      } else {
        $('#interviews-button').removeClass('sticky');
      }
      if (scrollTop > questionsButtonTop) {
        $('#questions-button').addClass('sticky');
      } else {
        $('#questions-button').removeClass('sticky');
      }
    };

    stickyButton();

    $(window).scroll(function() {
        stickyButton();
    });
    */