<?php
if(!kirby()->request()->ajax()) {
    snippet('header');
    echo '<div id="main-wrapper" class="flex-container">';
    snippet('navigation');
    snippet('article');
    echo '<div id="separator" class="hidden"><a class="key-icon active"></a></div>';
    echo '<div id="interviews"><div class="int-content">';
    snippet('intro');
    snippet('about');
    echo '<div class="interview-container overlay bla">';
}
?>

<?php
  //$interview = $pages->find('interviews')->children()->shuffle()->first(); // gets random interview for testing purposes
  $interview = $page;
?>

<div id="interview-content">
  <h1><?= $interview->title()->html() ?></h1>

  <div id="interview-info" class="aside-info">
    <figure>
      <?php foreach($interview->images() as $image): ?>
        <div id="about-image" class="aside-image" style="background-image: url('<?php echo $image->url() ?>');">
            <!--<a href="<//?php echo $image->url() ?>">--> <!-- is the wrapping anchor necessary? -->
                <img src="<?php echo $image->url() ?>" alt="">
            <!--</a>-->
        </div>
      <?php endforeach ?>
      <figcaption>
        <ul>
          <li class="extended"><?= $interview->title()->html() ?></li>
          <li><?= $interview->place()->html() ?></li>
          <li><a href="<?= $interview->web() ?>"><?= $interview->web() ?></a></li>
          <li>Das Inter&shy;view mit <?= $interview->title()->html() ?> wurde am <?= date('d.m.Y', $interview->date()) ?> in <?= $interview->place() ?> geführt.</li>
        </ul>
      </figcaption>
    </figure>
  </div>

  <div class="i-intro"><?= $interview->introduction()->kirbytext() ?></div>

  <?php foreach($interview->Interview()->toStructure() as $interviewpart): ?>
    <div class="i-question">
      <?= $interviewpart->vorfrage()->kirbytext() ?>
      <?= $interviewpart->frage()->kirbytext() ?>
    </div>
    <div class="i-answer">
      <?= $interviewpart->antwort()->kirbytext() ?>
    </div>
  <?php endforeach ?>
</div>



<?php
if(!kirby()->request()->ajax()) {
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    snippet('marquee');
    snippet('footer');
}
?>
