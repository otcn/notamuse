$(document).ready(function() {

    /* AJAX SCRIPT */
    // History
    function projects(uid) {
        if (uid !== 'about'){
            $.ajax({
                url: '/' + uid, // url: 'http://localhost/~jensschnitzler/' + uid,
                type: 'POST',
                success: function(response) {
                    $('.interview-container').html(response);
                    $('.interview-container').removeClass('hidden');
                    $('#separator').removeClass('hidden');
                    classyLinks(); // adds classes to internal and external links in interviews -> see "classy-links.js"
                },
                error: function() {
                    console.log('ajax error');
                }
            });
        }
    }

  History.Adapter.bind(window, 'statechange', function() {
    var State = History.getState();
    var uid = State.hash.split('?')[0].substring(1);
    if (!uid.length == 0) {
      projects(uid);
    }
  });

  function push(uid) {
    History.pushState(uid, document.title, uid);
    return false
  }

  function init(){
    var uid = History.getState().hash.split('?')[0].substring(1);
    if (uid.length <= 0){  // if it’s not a subpage, show intro and seperator */
      $( '.intro-container' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
      $( '#separator' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
    }
    else if (uid == 'about'){
      $('.about-container').removeClass('hidden');
      $('#separator').removeClass('hidden');
    }
    else{
      $( '#separator' ).removeClass('hidden'); // if it’s subpage, only show the seperator
    }
  }

  init()

  /* on click the url and content should change */
  $('.nav-interview a, a.interviewee-title').on('click', function(e) {
    var uid = $(this).attr('href'); // get the href-url
    if (uid == window.location.href) {
      e.preventDefault(); // do nothing if current url equals href-url
    } else {
      push(uid);
      e.preventDefault();
    }
  });

//
// Former overlay.js:
//

  /* default */
  // $( '.intro-container' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
  // $( '#separator' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
  // $( '.about-container' ).addClass('hidden');
  // $( '.interview-container' ).addClass('hidden');

  /* close overlay and seperator */
  $('#separator').click(function(){
      $(this).addClass('hidden');
      $('.overlay').addClass('hidden');
      push('/'); // clear url
  });

  /* open about overlay */
  $('.nav-about a').click(function(){
      $('.about-container').removeClass('hidden');
      $('#separator').removeClass('hidden');
      push('about');
  });

  /* on mouseenter the interview should load into the container */
  $('a.interviewee-title, .nav-interview a').mouseenter(function(e) {
    var uid = $(this).attr('imgsrc'); // get image source
    $('.preview img').attr('src', uid);
    $('.preview figure').show();
  });
  $('a.interviewee-title, .nav-interview a').mouseleave(function(e) {
    $('.preview figure').hide();
    $('.preview img').attr('src', ''); // clear image source
  });



  // HIDE CHILD-ELEMENTS
    $('.child').hide(); // hide children by default

  // NAVIGATE TOPIC-LIST DROPDOWN
    $('.parent').children().click(function(){
        $(this).toggleClass('active');
        $(this).children('.topic-title').children().toggleClass('active');
        $(this).children('.question-title').children().toggleClass('active');
        $(this).children('.child').slideToggle('slow');
    }).children('.child').click(function (event) {
        event.stopPropagation();
    });

  // FUNCTION FOR LINKS WHICH OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE

    function topicLink(anchor) {
      // get target element and related relevant elements:
      var href = anchor.attr( 'href' );
      var target = $( href );
      var questionItem = target.parents('.question-item');
      var topicItem = target.parents('.topic-item');
      var topicTitle = topicItem.children('.topic-title').children('a');

      // hide/inactivate other stuff:
      $('.topic-list .active').removeClass('active'); // remove all active states in the topic list
      $('.topic-list .child').hide(); // hide all dropdowns

      // reveal relevant dropdowns:
      target.parents('.child').show();
      questionItem.children('.child').show(); // maybe use ".slideDown('slow')" instead?

      // add active states to relevant elements:
      target.addClass('active').siblings().addClass('active');
      topicTitle.addClass('active');
    };

  // CLICK NAV-QUESTION TO OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE

    // $('.nav-question a').click(function(){
    //   var anchor = $( this );
    //   topicLink(anchor);
    // });

    $('.nav-question a').click(function(e){
        var anchor = $( this );
        if (anchor.attr('href').indexOf('http') == -1){
          topicLink(anchor);
        }
        else{
          push(anchor.attr('href').split('#')[0])
          e.preventDefault();
        }
      });
    });

  // CLICK INTRO-LINK TO OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE

    $('.intro-nav a').click(function(){

      var anchor = $( this );
      var overlay = anchor.parents('.overlay').addClass('hidden');
      var separator = $('#separator').addClass('hidden');
      topicLink(anchor);

    });

  // SMOOTH SCROLLING TO INTERNAL ANCHOR TARGETS
      ////////
      // The following code, which enables Smooth Scrolling, is copied from https://css-tricks.com/snippets/jquery/smooth-scrolling/
        // Select all links with hashes
        $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
              &&
              location.hostname == this.hostname
            ) {
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 500, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  };
                });
              }
            }
          });

  // LANGUAGE: ENGLISH
    $('.language-anchor').click(function(){
        alert('Awfully sorry, but english isn\'t available yet!');
    });

  // TOGGLE OPEN- AND CLOSE-ICONS
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

  // NAVIGATION
    // DEFAULT
    $('.sub').hide(); // hide children by default

    // TOPICS-BUTTON
    $('.nav-topics a').addClass('active'); // activate topics-button by default

    $('.nav-topics a').click(function(){
      console.log('topics-button clicked');
      $('.active').removeClass( 'active' );
      $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class to "#wrapper"
      $('.sub').slideUp(100);
      $('.child').hide(); // hide all child-elements
      $(this).addClass('active');
    });


    // CONTROL NAV-MODE
    $('.nav-switch').click(function(){
      console.log('nav-switch clicked');
      $('.sub').not( $(this).siblings('.sub') ).slideUp(100);
      if ( $(this).siblings('.sub').is(":hidden") ){  // if this sub is hidden
        $("#main-wrapper").addClass("nav-mode");                // add "nav-mode" class to "#wrapper"
        $(this).siblings('.sub').slideDown(100);
        $('.nav-switch, .nav-button').removeClass('active');
        $(this).addClass('active');
      } else {                                             // if this sub is not hidden
        $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class to "#wrapper"
        $(this).siblings('.sub').slideUp(100);
        $(this).removeClass('active');
        $('#topics-button').addClass('active');
      }
    });

    $('#content').click(function(){
      $('#main-wrapper').removeClass("nav-mode");
      $('.sub').slideUp(100);
    });

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



    // copy of marquee.js - in here for testing purposes only:

    function marquee() {

      var marquee = $( ".marquee" ); // get my marquee cotainer
      var marqTop = $( marquee ).offset().top; // get my marquee cotainer's inner width
      console.log( "marqTop: " + marqTop );

      var pLast = marquee.children('p').last(); // get my last p
      pLast.addClass( "marker" );
      var pText = pLast.text(); // get my last p's text
      console.log( pText );

      var pLastTop = Math.ceil( marqTop - pLast.offset().top ); // calculate distance between my last p's right side and the parent container
      console.log( "pLastTop: " + pLastTop );

      if( pLastTop < 0 ) { // if p exceeds marquee
        $( ".marker" ).removeClass( "marker" );
        //$( marquee ).append("<p>" + pText + "</p>"); // add new p;
        $( "<p>" + pText + "</p>" ).addClass( "marker" ).appendTo( marquee ); // add new p;
      }
    }
    marquee();

    $(window).scroll(function() {
      marquee();
      var myElements = $( ".marquee p" );
      myScroll = $(window).scrollTop(); // vertical scroll position
      myElements.css({"transform" : "translateX(" + -myScroll + "px)" });
    });

});