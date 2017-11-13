$(document).ready(function() {

//
// Ajax script
//

  // History
  function projects(uid) {
      console.log(uid) // Hier muss beim Klick auf Christiane Funken "Christiane-Funken" ausgegeben werden
    $.ajax({
      url: '/' + uid, // url: 'http://localhost/~jensschnitzler/' + uid,
      type: 'POST',
      success: function(response) {
          $('.interview-container').html(response);
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

  $(document).on('click', '.nav-interview a, a.interviewee-title', function(e) {
    var uid = $(this).attr('href'); // get the href-url
    if (uid == window.location.href) {
      e.preventDefault(); // do nothing if current url equals href-url
    } else {
      push(uid);
      e.preventDefault();
    }
  });

  $(document).on('click', '.nav-interview a, a.interviewee-title', function(e) { //aside #fragen li a
      e.preventDefault();
  });

});
