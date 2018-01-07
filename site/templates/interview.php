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
    echo '<div class="interview-container overlay container">';
}
?>

<?php
  //$interview = $pages->find('interviews')->children()->shuffle()->first(); // gets random interview for testing purposes
  $interview = $page;
  $plural = $page->interviewpartner(); // one or multiple interview partners
?>

<!-- Check if this interview has one or multiple interview partners: -->
<?php
if ($plural == '1') :
  // interview was conducted with more than one interviewee
  echo '<script>console.log("' . $interview->title() . ' is plural")</script>';
else :
  // interview was conducted with only a single interviewee
  echo '<script>console.log("' . $interview->title() . ' is singular")</script>';
endif;
?>

<div id="interview-content" class="overlay-content">
  <h1><?= $interview->title()->kirbytext() ?></h1>

  <div id="interview-info" class="aside-info">
    <figure>
      <?php foreach($interview->images() as $image): ?>
        <div class="aside-image" style="background-image: url('<?php echo $image->url() ?>');">
            <!--<a href="<//?php echo $image->url() ?>">--> <!-- is the wrapping anchor necessary? -->
                <img src="<?php echo $image->url() ?>" alt="">
            <!--</a>-->
        </div>
      <?php endforeach ?>
      <figcaption>
        <ul>

          <li class="extended">  <!-- (1) studio title / title -->
            <?php
            if( !$interview->studiotitle()->empty() ) {
              echo $interview->studiotitle()->html();
            } else {
              echo $interview->title()->html();
            }
            ?>
          </li>

          <li> <!-- (2) place of residency -->
            <?php if( !$interview->residence()->empty() ): ?>
              <?php echo $interview->residence()->html() ?>
            <?php endif ?>
          </li>

          <li> <!-- (3) website -->
            <a href="<?= $interview->web() ?>" class="a-extern" target="_blank"><?= $interview->web() ?></a>
          </li>

          <!-- (4) explanatory sentence -->
          <li><?php echo l::get('interview-info-1') ?><?= date('d.m.Y', $interview->date()) ?> in <?= $interview->place() ?><?php echo l::get('interview-info-2') ?></li>

          <li> <!-- (5) image credits -->
            <?php if( !$interview->interviewimagecredits()->empty() ): ?>
              <?php echo $interview->interviewimagecredits()->html() ?>
            <?php endif ?>
          </li>

        </ul>
      </figcaption>
    </figure>
  </div>

  <div class="i-intro"><?= $interview->introduction()->kirbytext() ?></div>

  <?php foreach($interview->Interview()->toStructure() as $interviewpart): ?>
    <div id="<?= $interviewpart->fid()->html() ?>" class="i-question" >
      <?= $interviewpart->vorfrage()->kirbytext() ?>

      <?php
      if($plural == '1') {
        echo $interviewpart->frage()->kirbytext();
      }
      else {
        foreach($pages->find('themen')->grandchildren()->visible() as $frage) {
          if( strcasecmp($frage->title(), $interviewpart->frage() ) == 0) {
            echo $frage->alternative()->kirbytext();
          }
        }
      }
      ?>

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
