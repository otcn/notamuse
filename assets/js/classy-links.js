$(document).ready(function() {

//
// This script optically improves links by adding classes and removing http(s)
//

  $('.network-list a').attr('class', 'a-extern').attr('target', '_blank');

  function classyLinks() {
    console.log( 'classyLinks' );

      // This script adds the classes "a-extern" and "a-intern" to the designated links
      $('p a').each(function(){
        if ($(this).attr('href') && $(this).attr('href').match(/https?:\/\/(?!localhost)/)) {
          $(this).attr('target','_blank').addClass('a-extern').removeClass('a-intern');
        } else {
          $(this).attr('target','_self').removeClass('a-extern').addClass('a-intern');
        }
      });

      // This script removes "http(s)://" in front of the link in the interview aside figcaption
      $('a').each(function(){
        var myText = $( this ).text();
        myText = myText
          .replace(/(https*\:\/\/)/g, "");
        $( this ).text(myText);
      });

      // This script emphasizes the initials in front of an answer
      $( 'p' ).each(function(){
        console.log('get initials');
        var myText = $( this ).html();
        myText = myText
          .replace(/([A-Z]{2}\:)/g, '<span class=\'extended\'>$1</span>'); //([A-Z]{2}\:)
        $( this ).html(myText);
      });

  };
  classyLinks();

  // TEST-TEST-TEST:
  $( '.overlay' ).click(function(){
    classyLinks();
  })

});
