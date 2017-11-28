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
            $( '.intro-container' ).removeClass('hidden');
            $( '#separator' ).removeClass('hidden');
            $('.nav-topics').find('.active').removeClass('active'); // deactivate topics-button
        }
        else if (uid == 'about'){
            $('.about-container').removeClass('hidden');
            $('#separator').removeClass('hidden');
            $('.nav-topics').find('.active').removeClass('active'); // deactivate topics-button
        }
        else{
            $( '#separator' ).removeClass('hidden'); // if it’s subpage, only show the seperator
            $('.nav-topics').find('.active').removeClass('active'); // deactivate topics-button
        }
        classyLinks(); // adds classes to internal and external links in interviews -> see "classy-links.js"
    }

    init()

    /* EVENTS */

    /* open an interview, on click the url and content should change */
    $('.nav-interview a, a.interviewee-title').on('click', function(e) {
      var uid = $(this).attr('href'); // get the href-url
      if (uid == window.location.href) {
          e.preventDefault(); // do nothing if current url equals href-url
      } else {
          push(uid);
          e.preventDefault();
          //$( "div.overlay" ).scrollTop( 0 );
      }
      classyLinks(); // adds classes to internal and external links in interviews -> see "classy-links.js"
    });

    /* click on a nav-question to EITHER open scroll to the related answer (under the main topics) OR (in case of a "special question") open the related interview overlay and scroll to the related answer */
    $('.nav-question a').click(function(e){

      var anchor = $( this );
      if (anchor.attr('href').indexOf('http') == -1){
        topicLink(anchor);
      }
      else{
        push(anchor.attr('href').split('#')[0])
        e.preventDefault();
      }
      classyLinks(); // adds classes to internal and external links in interviews -> see "classy-links.js"
    });

    /* OVERLAY */
    /* close overlay and seperator */
    $('#separator').click(function(){
        $(this).addClass('hidden');
        $('.overlay').addClass('hidden');
        push('/'); // clear url
        $('.overlay').scrollTop( 0 ); // scrolls all overlays (back) to top
        $('.marquee').removeAttr( "style" );
    });

    /* open about overlay */
    $('.nav-about a').click(function(){
        $('.about-container').removeClass('hidden');
        $('#separator').removeClass('hidden');
        $('#separator .key-icon').addClass('active');
        push('about');
        $('.marquee').css("background-color", "transparent");
        $('.nav-topics').find('.active').removeClass('active'); // deactivate topics-button
    });

    /* SHOW INTERVIEW PREVIEW IMAGE */
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


    /* NAVIGATION AND TOPIC LIST */

    // HIDE CHILD-ELEMENTS
    $('.child').hide(); // hide children by default

    // NAVIGATE TOPIC-LIST DROPDOWN
    $('.parent').children().click(function(){

      if ( $(this).is( '.active' ) ) {
        $(this).removeClass('active');
        $(this).find('.active').removeClass('active');
        $(this).find('.child').slideUp('fast');
      } else {
        $(this).toggleClass('active');
        $(this).children('.topic-title').children().toggleClass('active');
        $(this).children('.question-title').children().toggleClass('active');
        $(this).children('.child').slideToggle('slow');
      }
    }).children('.child').click(function (event) {
      event.stopPropagation();
      $('.nav-switch').removeClass('active');
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
        $('.nav-topics').find('.active').removeClass('active'); // remove all active states in the topic list
        $('.topic-list .child').hide(); // hide all dropdowns

        // reveal relevant dropdowns:
        target.parents('.child').show();
        questionItem.children('.child').show(); // maybe use ".slideDown('slow')" instead?

        // add active states to relevant elements:
        target.addClass('active').siblings().addClass('active');
        topicTitle.addClass('active');
        topicItem.addClass('active');
    };

    // CLICK INTRO-LINK TO OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE
    $('.intro-nav a').click(function(){
        var anchor = $( this );
        var overlay = anchor.parents('.overlay').addClass('hidden');
        var separator = $('#separator').addClass('hidden');
        topicLink(anchor);
    });

    // LANGUAGE: ENGLISH
    $('.language-anchor').click(function(){
        alert('Awfully sorry, but english isn\'t available yet!');
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

  // NAVIGATION

    // DEFAULT
    $('.sub').hide(); // hide children by default

    // NAV: CLICK >TOPICS<
    $('.nav-topics a').click(function(){
      console.log('topics-button clicked');
      $('.active').removeClass( 'active' );
      $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class from "#wrapper"
      $('.sub').slideUp(100);
      $('.child').hide(); // hide all child-elements
      $('html,body, html *').animate({ scrollTop: 0 }, 'slow');
      $(this).addClass('active');
    });

    // NAV: CONTROL NAV-MODE
    $('.nav-switch').click(function(){
      console.log('nav-switch clicked');

      $('.nav').find('.active').removeClass('active');
      $('.sub').not( $(this).siblings('.sub') ).slideUp(100);

      if ( $(this).siblings('.sub').is(":hidden") ){  // if this sub was hidden -> open it
        console.log('-> open sub');

        $("#main-wrapper").addClass("nav-mode");      // add "nav-mode" class to "#wrapper"
        $(this).siblings('.sub').slideDown(100);

        $(this).addClass('active');
        $(this).siblings('.key-icon').addClass('active');
      } else {                                      // if this sub was not hidden -> close it
        console.log('-> close sub');

        $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class from "#wrapper"
        $(this).siblings('.sub').slideUp(100);
        $('#topics-button').addClass( 'active' );
      }
    });

    // CLOSE NAV-MODE
    $('#content *').click(function(){
      console.log('content clicked -> nav-mode ended');
      $('#main-wrapper').removeClass('nav-mode');
      $('.sub').slideUp(100);
      $('.nav').find('.active').removeClass('active');
      $('#topics-button').addClass('active');
    });

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







