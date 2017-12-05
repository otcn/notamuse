$(document).ready(function() {


var fid;
 /* JANAS AJAX FUNCTIONS ================================================ */

   // History
   function projects(uid) {
     if (uid !== 'about') {
       $.ajax({
         url: '/' + uid, // url: 'http://localhost/~jensschnitzler/' + uid,
         type: 'POST',
         success: function(response) {
           $('.interview-container').html(response);
           $('.interview-container').removeClass('hidden');
           $('#separator').removeClass('hidden');
           classyLinks(); // adds classes to internal and external links in interviews -> see "classy-links.js"
           if (fid){
               $('.interview-container').animate({
                 scrollTop: $('#' + fid).offset().top
               }, 300);
               fid = '';
           }
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

  /*
  function init(){
    var uid = History.getState().hash.split('?')[0].substring(1);
    if (uid.length <= 0){  // if it’s not a subpage, show intro and separator
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
  */

  function init(){
    console.log( 'hash: ' + History.getState().hash );
    var uid = History.getState().hash.split('?')[0].substring(1);
    //var myArray = History.getState().hash.split('/');
    //var uid = myArray[myArray.length - 1].substring(0);
    console.log( 'uid: ' + uid );

    if (uid.length <= 0){  // if it’s not a subpage: show intro and separator
      openSeparator();
      $('.overlay').addClass('hidden');
      $('.intro-container').removeClass('hidden');
    }
    else if ( uid.toLowerCase().indexOf( "intro" ) >= 0 ) { // if uid contains "intro": show intro overlay
      openSeparator();
      $('.overlay').addClass('hidden');
      $('.intro-container').removeClass('hidden');
    }
    else if ( uid.toLowerCase().indexOf( "about" ) >= 0 ) { // if uid contains "about": show about overlay
      openSeparator();
      $('.overlay').addClass('hidden');
      $('.about-container').removeClass('hidden');
      $('.marquee').css("background-color", "transparent");
    }
    else if ( uid.toLowerCase().indexOf( "interview" ) >= 0 ) { // if uid contains "interview": show interview overlay
      openSeparator();
      $('.overlay').addClass('hidden');
      $('.interview-container').removeClass('hidden');
    }
    else {   // in any other case: show intro and separator
      openSeparator();
      $('.overlay').addClass('hidden');
      $('.intro-container').removeClass('hidden');
    }
  }

  /* INIT AJAX */

  init();


  /* JENS FUNCTIONS ================================================ */

  // FUNCTION FOR LINKS WHICH OPEN RELATED ANSWERS AND SMOOTHLY SCROLL THERE: BY ANCHOR-ELEMENT'S HREF
  function openAnswer(anchor) {
    // get target element:
    var myDataRef = anchor.attr('data-ref');
    if ( myDataRef == null ) {
      var href = anchor.attr( 'href' );
      console.log( 'myHref: ' + href );
      var target = $( href );
    } else {
      console.log( 'myDataRef: ' + myDataRef );
      var target = $( '.question-title a:contains(' + myDataRef + ')' );
    }
    openAnswerGetTarget(target);
  };

  function openAnswerGetTarget(target) {
    //get target ID
    console.log( target );
    var targetID = target.attr('id');
    console.log( 'targetID: ' + targetID );
    // hide/inactivate other stuff:
    closeTopics();
    // get related relevant elements:
    target.addClass('active').siblings().addClass('active');
    var topicItem = target.parents('.topic-item').addClass('active');
    var topicTitle = topicItem.children('.topic-title').addClass('active').children('a').addClass('active');
    var questionItem = target.parents('.question-item').addClass('active');
    var questionTitle = target.parents('.question-title').addClass('active');
    // reveal relevant dropdowns:
    target.parents('.child').show(); // or ".slideDown('fast')" ?
    questionItem.children('.child').show(); // or ".slideDown('fast')" ?
    var container = target.parents('#content');
    $( container ).animate({ scrollTop: target.offset().top - 111 }, 300);
  };

  // CLOSE AND DEACTIVATE ALL TOPICS AND THEIR CHILDREN
  function closeTopics() {
    $('.topic-list .sub').slideUp( 'fast' );
    $('.topic-list .child').slideUp( 'fast' ); // hide all child-elements
    $('.topic-list .active').removeClass( 'active' ); // remove all active states in the topic list
  };

  // CLOSE AND DEACTIVATE ALL NAV-ELEMENTS AND THEIR CHILDREN
  function closeNav() {
    console.log('close nav');
    $("#main-wrapper").removeClass("nav-mode"); // remove "nav-mode" class from "#wrapper"
    $('.nav .active').removeClass( 'active' ); // remove all active states in the topic list
    $('.nav .sub').slideUp('slow');
    $('.nav .child').slideUp('slow'); // hide all child-elements
    $('#topics-button').addClass('active');
  };

  function closeMobileNav( element ) { // for mobile only
    var myNav = $( element ).parents('.nav');
    if( myNav.is( '.open' ) ){
      myNav.removeClass('open');
    }
  };

  // OPEN SEPARATOR
  function openSeparator() {
    console.log('open separator');
    $('#separator').removeClass('hidden');
    $('#separator .key-icon').addClass('active');
    $('#topics-button').removeClass('active'); // deactivate topics-button
  };

  // CLOSE SEPARATOR AND OVERLAY
  function closeSeparator() {
    console.log('close separator');
    $('#separator').addClass('hidden');
    $('.overlay').addClass('hidden');
    $('.overlay').scrollTop( 0 ); // scrolls all overlays (back) to top
    $('.marquee').removeAttr( "style" );  // removes transparent background (about-overlay)
    $('#topics-button').addClass('active');
    push('/'); // clear url
  };

  // UN-/STICK THE INTRO NAV ELEMENT
  function stickyIntroNav() {
    console.log('stickyIntroNav');
    var el1 = $('.intro-nav');
    var el2 = $('.intro-quote');
    var container = $('.intro-container');

    var el1Height = el1.outerHeight( false );

    var el2Bottom = el2.offset().top + el2.height();

    var containerHeight = container.innerHeight();

    if( containerHeight >= el2Bottom + el1Height ) {
      el1.addClass('sticky');
    } else {
      el1.removeClass('sticky');
    }
  };

/* EVENTS ================================================ */

  stickyIntroNav();

  $(window).resize(function(){
    stickyIntroNav();
  });

  /* DEFAULT */

  $('.sub').hide(); // hide children by default
  $('.child').hide(); // hide children by default

  /* EVENTS */

  // CLOSE NAV-MODE
  $('#content *').click(function(){
    closeNav();
  });

  // NAVIGATION: click >topics-button<
  $('#topics-button, .button-title').click(function(){
    console.log('topics-button clicked');
    $('html,body, html *').animate({ scrollTop: 0 }, 'slow');
    closeNav();
    closeTopics();
  });

  // NAVIGATION: click >nav-switch<
  $('#questions-button, #interviews-button').click(function(){
    console.log('nav-switch clicked');
    var myButton = $(this);
    var mySub = myButton.siblings('.sub');
    if ( mySub.is(":hidden") ){  // if this sub was hidden -> open it
      console.log('-> open sub');
      $("#main-wrapper").addClass("nav-mode"); // add "nav-mode" class to "#wrapper"
      $('.nav .active').removeClass('active');
      $('.sub').not( mySub ).hide();

      mySub.slideDown('slow');
      myButton.addClass('active');
      //myButton.siblings('.key-icon').addClass('active');
    } else {
      closeNav();
      console.log('-> close sub');
    } // if this sub was not hidden -> close it
  });


  /* NAVIGATION */
  /* click on a nav-question to EITHER open scroll to the related answer (under the main topics) OR (in case of a "special question") open the related interview overlay and scroll to the related answer */
  $('.nav-question a').click(function(e) {
    closeMobileNav( this );
    closeTopics();
    var anchor = $(this);
    if (anchor.attr('href').indexOf('http') == -1) {
      openAnswer(anchor);
    } else {
      e.preventDefault();
      var myURL = anchor.attr('href').split('#')[0]; // "split('#')[0]" -> split string into array at "#" and take first array element
      var myID = anchor.attr('href').split('#')[1];
      fid = anchor.attr('href').split('#')[1];
      push(myURL);
    }
  });

  /* NAVIGATION: click >nav-interview< / TOPICS: click >interviewee-title< */
  /* open an interview, on click the url and content should change */
  $('.nav-interview a, a.interviewee-title').on('click', function(e) {
    closeMobileNav( this );
    var uid = $(this).attr('href');    // get the href-url
    if (uid == window.location.href) {
        e.preventDefault();            // do nothing if current url equals href-url
    } else {
        push(uid);
        e.preventDefault();
    }
  });

  // NAVIGATION: click >about<
  $('#about-button').click(function(){
    openSeparator();
    push('about');
    $('.about-container').removeClass('hidden');
    $('.marquee').css("background-color", "transparent");
    closeMobileNav( this );
  });

  // NAVIGATION: click >english<
  $('#language-button').click(function(){
    alert('Sorry! English isn\'t available yet, but we are working on it!');
    closeMobileNav( this );
  });

  // INTRO: click answer-link to open related answer
  $('.js-intro-answer').click(function(event){
    event.preventDefault(); // prevent the link from following the URL
    var anchor = $(this);
    closeSeparator();
    openAnswer(anchor);
  });

  // INTRO: click interview-link to open related interview
  $('.js-intro-interview').click(function(event){
    event.preventDefault(); // prevent the link from following the URL
    var anchor = $(this).attr('href');
    closeSeparator();
    push(anchor);
  });

  // TOPICS: open / close dropdown
  $('.parent').children().click(function(){
    if ( $(this).is( '.active' ) ) {
      $(this).removeClass('active');
      $(this).find('.active').removeClass('active');
      $(this).find('.child').slideUp('slow');
    } else {
      $(this).addClass('active');
      $(this).children('.topic-title').toggleClass('active');
      $(this).children('.question-title').toggleClass('active');
      $(this).children('.child').slideToggle('slow');
    }
  }).children('.child').click(function (event) {
    event.stopPropagation();
    $('.nav-switch').removeClass('active');
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

  /* OVERLAY */
  /* close overlay and separator */
  $('#separator, .js-intro-close').click(function(){
    closeSeparator();
  });

  /* MOBILE NAV HEADER */
  /* close and open navigation and do other fun stuff */
  $('.nav-mobile-icon').click(function(){
    var myBurger = $(this);
    var myNav = $( '.nav' );

    if( myBurger.is('.open') ) {
      myBurger.removeClass('open');
      myNav.removeClass('open');
      closeSeparator();
    } else {
      myBurger.addClass('open');
      myNav.addClass('open');
    }

  });


  /* UNTIDY ================================================ */




}); // closing function: "$(document).ready"
