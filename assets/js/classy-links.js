$(document).ready(function() {

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