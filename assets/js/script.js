$(document).ready(function() {

//
// Ajax script
//

  // History
  function projects(uid) {
    $.ajax({
      url: '/' + uid, // url: 'http://localhost/~jensschnitzler/' + uid,
      type: 'POST',
      success: function(response) {
          $('.interview-container').html(response);
          $('.interview-container').removeClass('hidden');
          $('#separator').removeClass('hidden');
      },
      error: function() {
          console.log('ajax error');
      }
    });
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
  });

  /* on mouseenter the interview should load into the container */
  $('.nav-interview a, a.interviewee-title').mouseenter( function(e) {
    var uid = $(this).attr('imgsrc'); // get image source
    $('.preview img').attr('src', uid);
    $('.preview figure').show();
  });
  $('.nav-interview a, a.interviewee-title').mouseleave( function(e) {
    $('.preview figure').hide();
    $('.preview img').attr('src', ''); // clear image source
  });

});
