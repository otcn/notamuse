<?php
  $intro = $pages->find('intro');
  $array_quotes = $intro->quotes()->yaml(); // array containing all 'quotes' structure fields
  $array_key = array_rand($array_quotes); // return a random key from my array
?>

<div class="intro-container overlay">
  <div id="intro-content">
  	<div class="intro-quote">
	  <h1><?php echo $array_quotes[$array_key]['quote']; ?></h1>
	  <p><?php echo $array_quotes[$array_key]['author']; ?></p>
	</div>
	<div class="intro-nav">
	  <ul>
	    <li><?php echo $array_quotes[$array_key]['question']; ?></li>
	    <li>
	    	<a href="#woraus-zieht-ihr-inspiration">Alle Antworten zu dieser Frage</a><!-- 'href' value is not correct yet! how do i get the propert id to this question's section in the main content? -->
	    </li>
	    <li><a href="">Alle Themen im Überblick</a></li>
	  </ul>
	</div>
  </div>
</div>