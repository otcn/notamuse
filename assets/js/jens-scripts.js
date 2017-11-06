$(document).ready(function(){

  // CLICK NAV QUESTIONS TO OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE

  //<a onclick="$('#extracontent').show();" id="slick-toggle" class="schedule" href="#extracontent">Check out our Schedule &amp; Rates</a>

  $('#sl-1 a').click(function(){
    var href = $(this).attr('href');
    console.log( href );
    var target = $( href );
    console.log( target );
    target.addClass('active');

    target.parents('.child').slideDown('slow');
    target.siblings('.child').slideDown('slow');

    //target.parents('.question-item').addClass('active');
    //target.children( a ).addClass('active');

    //var topicParent = target.parents('.topic-item');

    //topicParent.children('.topic-title').children( a ).addClass('active');

    //topicParent.children('.child').slideDown('slow');

  });



  // ATTRIBUTES

  $('.network-list a').attr('class', 'a-extern').attr('target', '_blank');

  // CLOSE OVERLAYS

    $('#separator').click(function(){
        $(this).hide();
        $('.overlay').addClass('hidden');
    });

  // PREVIEW INERVIEWEE-IMAGE

    var hoverTimeout;

    $('.interviewee-title, .interview-anchor').hover(function() {
        clearTimeout(hoverTimeout);
        $('#interview-info ul').addClass('preview');
    }, function() {
        hoverTimeout = setTimeout(function() {
            $('#interview-info ul').removeClass('preview');
        }, 1000);
    });

  // OPEN INTERVIEW
    $('.interviewee-title, .interview-anchor').click(function(){
        $('.interview-container').removeClass('hidden');
        $('#separator').show();
    });

  // OPEN ABOUT
    $('.about-anchor').click(function(){
        $('.about-container').removeClass('hidden');
        $('#separator').show();
    });

  // ENGLISH PLEASE
    $('.language-anchor').click(function(){
        alert('Awfully sorry, but english isn\'t available yet!');
    });

  // OPEN CONTENT-LISTS
    $('.child').hide(); //Hide children by default

    $('.parent').children().click(function(){
        $(this).toggleClass('active');
        $(this).children('.topic-title').children().toggleClass('active');
        $(this).children('.question-title').children().toggleClass('active');
        $(this).children('.child').slideToggle('slow');
    }).children('.child').click(function (event) {
        event.stopPropagation();
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


  // CONTROL NAV-MODE
    $('#topics-button').addClass('active');

    $('.sub-list').hide(); //Hide children by default

    $('.nav-switch').click(function(){
      console.log('nav-switch clicked');
      $('.sub-list').not( $(this).siblings('.sub-list') ).slideUp(100);
      if ( $(this).siblings('.sub-list').is(":hidden") ){  // if this sub-list is hidden
        $("#main-wrapper").addClass("nav-mode");                // add "nav-mode" class to "#wrapper"
        $(this).siblings('.sub-list').slideDown(100);
        $('.nav-switch, .nav-button').removeClass('active');
        $(this).addClass('active');
      } else {                                             // if this sub-list is not hidden
        $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class to "#wrapper"
        $(this).siblings('.sub-list').slideUp(100);
        $(this).removeClass('active');
        $('#topics-button').addClass('active');
      }
    });

    $('#topics-button').click(function(){
      console.log('topics-button clicked');
      $('.nav-switch, .nav-button').removeClass('active');
      $(this).addClass('active');
      $('.child').hide(); //Hide all children
      $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class to "#wrapper"
      $('.sub-list').slideUp(100);
    });

    $('#content').click(function(){
      $('#main-wrapper').removeClass("nav-mode");
      $('.sub-list').slideUp(100);
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