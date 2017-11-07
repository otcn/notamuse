$(document).ready(function() {

//
// This whole script is most likely not needed anymore, because id's and href's are now based on the 'fid'
//

  function setQuestionID() {
      $('.question-title a').each(function(){

        var str = $(this).text();
        str = str.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
        str = str.replace(/ä/g,"ae");
        str = str.replace(/ö/g,"oe");
        str = str.replace(/ü/g,"ue");
        str = str.replace(/\s+/g, '');

        $(this).attr('id',str);

      })
  };

  function setIntroLink() {
    $('.js-answer-link').each(function(){

        var str = $(this).attr('href');
        str = str.replace(/[.,\/!?$%\^&\*;:{}=\-_`~()]/g,"");
        str = str.replace(/ä/g,"ae");
        str = str.replace(/ö/g,"oe");
        str = str.replace(/ü/g,"ue");
        str = str.replace(/\s+/g, '');

        $(this).attr('href',str);

      })
  };

  //setQuestionID();
  //setIntroLink();
});