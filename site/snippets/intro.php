<?php
$quotes = array();
$authors = array();
$questions = array();
$fids = array();

foreach( $pages->find('interviews')->children()->visible() as $interview ) {
    foreach( $interview->interview()->toStructure() as $interviewUnit ) {
        if( !$interviewUnit->quote()->empty() ) {
            array_push( $quotes, $interviewUnit->quote()->value() );
            array_push( $authors, $interview->title()->value() );
            array_push( $questions, $interviewUnit->frage()->value() );
            array_push( $fids, $interviewUnit->fid() );
            //array_push( $fids, $interviewUnit->fid()->value() );
        }
    }
}
$array_key = array_rand($quotes); // return a random key from my quotes-array
$quote = $quotes[$array_key];
$author = $authors[$array_key];
$question = $questions[$array_key];
$fid = $fids[$array_key];
?>

<?php echo '<script>console.log('.$fid.')</script>'; ?>

<div class="intro-container overlay hidden">
  <div id="intro-content">
    <div class="intro-quote">
    <h1><?php echo $quote ?></h1>
    <p><?php echo $author ?></p>
  </div>
  <div class="intro-nav">
    <ul>
      <li><?php echo $question ?></li>
      <li>
        <a class="js-answer-link" href="#<?php echo $fid ?>">Alle Antworten zu dieser Frage</a>
      </li>
      <li><a href="#">Alle Themen im Überblick</a></li>
    </ul>
  </div>
  </div>
</div>