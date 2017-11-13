$(document).ready(function(){

  // DEFAULT
    $( '.intro-container' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
    $( '#separator' ).removeClass('hidden'); // should be ".removeClass('hidden')" later
    $( '.about-container' ).addClass('hidden');
    $( '.interview-container' ).addClass('hidden');

  // CLOSE OVERLAYS AND SEPARATOR
    $('#separator').click(function(){
        $( this ).addClass('hidden');
        $( '.overlay' ).addClass('hidden');
    });

  // PREVIEW INERVIEWEE-IMAGE <- needs proper Ajax implementation to work
    var hoverTimeout;
    $('.interviewee-title, .nav-interview a').hover(function() {
        clearTimeout(hoverTimeout);
        $('#interview-info figure').addClass('preview');
    }, function() {
        hoverTimeout = setTimeout(function() {
            $('#interview-info figure').removeClass('preview');
        }, 1000);
    });

  // OPEN INTERVIEW-OVERLAY
    $('.interviewee-title, .nav-interview a').click(function(){
        $('.interview-container').removeClass('hidden');
        $('#separator').removeClass('hidden');
    });

  // OPEN ABOUT-OVERLAY
    $('.nav-about a').click(function(){
        $('.about-container').removeClass('hidden');
        $('#separator').removeClass('hidden');
    });

});