
<div class="about-container overlay container">
<?php
  $about = $pages->find('about');
?>
  <div id="about-content">

  	<h1><?= $about->title()->html() ?></h1>
    <?= $about->text()->kirbytext() ?>
  </div>

  <div class="network-list">
  	<h2><?= $about->networkListTitle()->html() ?></h2>
  	<ul>
  	  <?php foreach($about->networks()->toStructure() as $network): ?>
  	  <li>
  	    <a href="<?php echo $network->url() ?>">
  	      <?php echo $network->name()->html() ?>
  	    </a>
  	  </li>
  	  <?php endforeach ?>
  	</ul>
  </div>

  <div id="about-info" class="aside-info">
    <figure>

      <?php foreach($about->images() as $image): ?>
        <div class="aside-image" style="background-image: url('<?php echo $image->url() ?>');">
            <!--<a href="<//?php echo $image->url() ?>">--> <!-- is the wrapping anchor necessary? -->
                <img src="<?php echo $image->url() ?>" alt="">
            <!--</a>-->
        </div>
      <?php endforeach ?>

      <figcaption><?= $about->imageCaption()->html() ?></figcaption>
    </figure>
  </div>

  <div id="about-imprint">
    <h2><?= $about->imprintTitle()->html() ?></h2>
    <?= $about->imprint()->kirbytext() ?>
  </div>

</div>
