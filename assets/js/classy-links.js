$(document).ready(function() {

//
// This script adds the classes "a-extern" and "a-intern" to the designated links
//

  $('.network-list a').attr('class', 'a-extern').attr('target', '_blank');

  function classyLinks() {

      $('p a').each(function(){
        if ($(this).attr('href') && $(this).attr('href').match(/https?:\/\/(?!localhost)/)) {
          $(this).attr('target','_blank').addClass('a-extern').removeClass('a-intern');
        } else {
          $(this).attr('target','_self').removeClass('a-extern').addClass('a-intern');
        }
      })
  };

  classyLinks();
});