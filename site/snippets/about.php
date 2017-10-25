<div class="about-container overlay">

  <div id="about-content">
      <?php
      $about = $pages->find('about');
      ?>

  	<h1><?= $about->title()->html() ?></h1>
	<p><?= $about->text()->kirbytext() ?></p>
  </div>

  <div id="network-list">
  	<h2><?= $about->networkListTitle()->html() ?></h2>

	<ul class="network-list">
	  <?php foreach($about->networks()->toStructure() as $network): ?>
	  <li>
	    <a href="<?php echo $network->url() ?>">
	      <?php echo $network->name()->html() ?>
	    </a>
	  </li>
	  <?php endforeach ?>
	</ul>
  </div>

  <div id="about-info">
  	<ul class="margin-info">
		<li>
            <?php foreach($about->images() as $image): ?>
                <div id="about-image" class="interviewee-image">
                    <a href="<?php echo $image->url() ?>">
                        <img src="<?php echo $image->url() ?>" alt="" style="width: 500px">
                    </a>
                </div>
            <?php endforeach ?>
		</li>
		<li><?= $about->imageCaption()->html() ?></li>
	</ul>
  </div>

</div>
