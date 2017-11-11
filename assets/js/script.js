$(document).ready(function() {

//
// What does this script do?
//

  // History
  function projects(uid) {
    var target = uid.substring(3); // what is this good for?
    $.ajax({
      url: 'http://localhost/~jensschnitzler/' + uid,
      type: 'POST',
      success: function(response) {
        if ("complete" === document.readyState) {
          $('.interview-container').html(response);
        } else {
          $('.interview-container').html(response);
        }
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
    } else {
      projects('xxxxxxxxx');
    }
  });

  function push(uid) {
    History.pushState(uid, document.title, uid);
    return false
  }

  // Initialize
  function init() {
    // substring http://localhost/~jensschnitzler/ = 33 characters
    var uid = window.location.href.substring(33);
    console.log(uid);
    if (uid.length >= 0) {
      push(uid);
    }
  }

  // Start
  get_browser(navigator.userAgent);

  //init();

  $(document).on('click', '.nav-interview a', function(e) {
    var uid = $(this).attr('href'); // get the href-url
    console.log(uid);
    if (uid == window.location.href) {
      e.preventDefault(); // do nothing if current url equals href-url
    } else {
      //substring http://localhost/~jensschnitzler/ = 33 characters
      console.log(uid.substring(33));
      push(uid);
      e.preventDefault();
    }
  });

  $(document).on('click', 'aside #fragen li a', function(e) {
      e.preventDefault();
  });

  $(document).on('click', 'aside #fragen li a', function(e) {
      e.preventDefault();
  });


});
