<?php
$quotes = array();
$titles = array();
$authors = array();
$questions = array();
$fids = array();

foreach( $pages->find('interviews')->children()->visible() as $interview ) {
    foreach( $interview->interview()->toStructure() as $interviewUnit ) {
        if( !$interviewUnit->quote()->empty() ) {
            array_push( $quotes, $interviewUnit->quote()->value() );
            array_push( $titles, $interview->title()->value() );
            array_push( $authors, $interview->quoteauthor()->value() );
            array_push( $questions, $interviewUnit->frage()->value() );
            array_push( $fids, $interviewUnit->fid() );
            //array_push( $fids, $interviewUnit->fid()->value() );
        }
    }
}
$array_key = array_rand($quotes); // return a random key from my quotes-array
$quote = $quotes[$array_key];
$title = $titles[$array_key];
$author = $authors[$array_key];
$question = $questions[$array_key];
$fid = $fids[$array_key];
?>

<?php echo '<script>console.log("quote-id: ' . $fid . ' ")</script>'; ?>

<div class="intro-container overlay">
  <div id="intro-content">
    <div class="intro-quote">
    <h1><?php echo $quote ?></h1>
    <p class="extended">

      <?php
      if ( !empty( $author )) {
        echo $author;
      } else { echo $title; }
      ?>

    </p>
  </div>
  <div class="intro-nav sticky">
    <ul>
      <li><?php echo $question ?></li>
      <li class=""><a class="js-intro-answer" href="#<?php echo $fid ?>">Alle Antworten zu dieser Frage</a></li>
      <li><a class="js-intro-close">Alle Themen im Überblick</a></li>
    </ul>
  </div>
  </div>
</div>