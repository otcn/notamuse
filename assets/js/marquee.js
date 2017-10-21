$( document ).ready(function() {

  function marquee() {

    var marquee = $( ".marquee" ); // get my marquee cotainer
    var marqTop = $( marquee ).offset().top; // get my marquee cotainer's inner width
    console.log( "marqTop: " + marqTop );

    var pLast = marquee.children('p').last(); // get my last p
    pLast.addClass( "marker" );
    var pText = pLast.text(); // get my last p's text
    console.log( pText );

    var pLastTop = Math.ceil( marqTop - pLast.offset().top ); // calculate distance between my last p's right side and the parent container
    console.log( "pLastTop: " + pLastTop );

    if( pLastTop < 0 ) { // if p exceeds marquee
      $( ".marker" ).removeClass( "marker" );
      //$( marquee ).append("<p>" + pText + "</p>"); // add new p;
      $( "<p>" + pText + "</p>" ).addClass( "marker" ).appendTo( marquee ); // add new p;
    }
  }
  marquee();

  $(window).scroll(function() {
    marquee();
    var myElements = $( ".marquee p" );
    myScroll = $(window).scrollTop(); // vertical scroll position
    myElements.css({"transform" : "translateX(" + -myScroll + "px)" });
  });
});

