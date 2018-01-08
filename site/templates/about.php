<!-- the following php places the header with css and js links and the opening html body tag -->
<?php
snippet('header');
?>

<!--<div id="main-wrapper" class="flex-container">-->
  <!-- the following php places all snippets concerning the main stage -->
  <?php
  //snippet('aside'); // old navigation
  snippet('navigation');
  snippet('article');
  ?>
</div>

<!-- the "separator" divides the main stage and the overlays. on click overlays close -->
<div id="separator" class="hidden"><a class="key-icon active"></a></div>

<div class="mobile-header"><div class="nav-mobile-icon open"><span></span><span></span><span></span><span></span></div><a class="button-title extended">notamuse</a></div>

<!-- the following php places all snippets concerning the overlays -->
<?php
snippet('intro');
snippet('about');
?>
<div class="preview"><figure><img src=""/></figure></div>
<?php
snippet('interview');
/*foreach($pages->visible() as $section) {
  snippet($section->uid(), array('data' => $section));
}*/
?>

<!-- the following php places the marquee snippet. the marquee is the vertical notamuse banner on the right window edge. should this be placed directly in here or be placed as a snippet? -->
<?php
snippet('marquee');
?>

<!-- the following php places the footer with the closing html body tag -->
<?php
snippet('footer');
?>
