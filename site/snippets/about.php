<div class="about-container overlay">

  <div id="about-content">
  	<h1><?= $page->title()->html() ?></h1>
	<p><?= $page->text()->kirbytext() ?></p>
  </div>

  <div id="network-list">
  	<h2><?= $page->networkListTitle()->html() ?></h2>

	<ul class="network-list">
	  <?php foreach($page->networks()->toStructure() as $network): ?>
	  <li>
	    <a href="<?php echo $network->networkUrl() ?>">
	      <?php echo $network->networkName()->html() ?>
	    </a>
	  </li>
	  <?php endforeach ?>
	</ul>
  </div>

  <div id="about-info">
  	<ul class="margin-info">
		<li>
			<div id="about-image" class="interviewee-image"> 
				<img src="<?= $page->aboutImage()->url() ?>" alt="About Image" />
			</div>
		</li>
		<li><?= $page->imageCaption()->html() ?></li>
	</ul>
  </div>

</div>
