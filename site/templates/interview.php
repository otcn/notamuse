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





  <div id="interview-info" class="aside-info">
    <figure>
      <?php foreach($interview->images() as $image): ?>
        <div id="about-image" class="interviewee-image">
            <a href="<?php echo $image->url() ?>">
                <img src="<?php echo $image->url() ?>" alt="">
            </a>
        </div>
      <?php endforeach ?>
      <figcaption>
        <ul>
          <li><?= $interview->title()->html() ?></li>
          <li><?= $interview->place()->html() ?></li>
          <li><?= $interview->web() ?></li>
          <li>Das Inter&shy;view mit <?= $interview->title()->html() ?> wurde am <?= $interview->date() ?> in <?= $interview->place() ?> geführt.</li>
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