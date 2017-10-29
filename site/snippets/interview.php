<div class="interview-container overlay">

  <div id="interview-content">
    <?php
      // $interviews = $pages->find('interviews');
      $interview = $pages->find('interviews')->children()->shuffle()->first(); // gets random interview for testing purposes
    ?>

    <h1><?= $interview->title()->html() ?></h1>
    <p><?= $interview->text()->kirbytext() ?></p>

  </div>

  <?php echo $interview->title() ?>
  <?php echo $interview->interviewpartner() ?>
  <?php echo $interview->introduction() ?>
  <?php echo $interview->Interview() ?>
  <?php echo $interview->interviewimage() ?>




  <div id="interview-info" class="margin-info">
    <figure>
      <?php foreach($interview->images() as $image): ?>
        <div id="interview-image" class="interviewee-image">
            <a href="<?php echo $image->url() ?>">
                <img src="<?php echo $image->url() ?>" alt="">
            </a>
        </div>
      <?php endforeach ?>
      <figcaption><?= $interview->imageCaption()->html() ?></figcaption>
    </figure>
  </div>

</div>
