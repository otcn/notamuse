<?php
if(!kirby()->request()->ajax()) {
    snippet('header');
    //echo '<div class="content">';
    //snippet('menu');
    //snippet('home');
    //echo '<div id="interviews"><div class="int-content">';
}
?>

<?php
// $interview = $pages->find('interviews')->children()->shuffle()->first(); // gets random interview for testing purposes
  $interview = $page;
?>

<div class="interview-container overlay">
  <div id="interview-content">
    <h1><?= $interview->title()->html() ?></h1>
    <p class="i-intro"><?= $interview->introduction()->kirbytext() ?></p>

    <?php foreach($interview->Interview()->toStructure() as $interviewpart): ?>
      <p class="i-question">
        <?php echo $interviewpart->vorfrage()->kirbytext() ?>
        <?php echo $interviewpart->frage()->kirbytext() ?>
      </p>
      <p class="i-answer">
        <?php echo $interviewpart->antwort()->kirbytext() ?>
      </p>
    <?php endforeach ?>

  </div>

  <!-- INFORMATION -->
  <div id="interview-info" class="aside-info">
    <figure>
      <?php if($image = $interview->image()): ?>
        <div class="interviewee-image" style="background-image:url(<?php echo $image->url() ?>)"></div>
      <?php endif ?>
      <figcaption>
        <ul>
          <li>Interviewee Name</li>
          <li>Berlin, Deutschland</li>
          <li><a target="_blank" href="http://www.amandahaas.ch/">amandahaas.ch</a></li>
          <li>Das Inter&shy;view mit Amanda Haas wurde am 21.&thinsp;4.&thinsp;2017 in Berlin geführt.</li>
        </ul>
      </figcaption>
    </figure>
  </div>

</div>

<?php
if(!kirby()->request()->ajax()) {
    //echo '</div></article>';
    //echo '</div>';
    //snippet('footer');
}
?>