$(document).ready(function() {


  // History
  function projects(uid) {
    var target = uid.substring(3);
    $.ajax({
      url: 'http://localhost:7000/' + uid,
      type: 'POST',
      success: function(response) {
        if ("complete" === document.readyState) {
          $('#interviews .content').html(response);
        } else {
          $('#interviews .content').html(response);
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
    // substring http://localhost:7000/ = 22 characters
    var uid = window.location.href.substring(22);

    console.log(uid);

    if (uid.length >= 0) {
      push(uid);
    }
  }


  // Start
  get_browser(navigator.userAgent);

  // init();

  $(document).on('click', 'aside #interviews li a', function(e) {
    var uid = $(this).attr('href');
    console.log(uid);
    if (uid == window.location.href) {
      e.preventDefault();
    } else {
      // substring http://localhost:7000/ = 22 characters
      console.log(uid.substring(22));
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
