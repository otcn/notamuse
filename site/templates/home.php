<!-- the following php places the header with css and js links and the opening html body tag -->
<?php snippet('header'); ?>

<!-- the "separator" divides the main stage and the overlays. on click overlays close -->
<div id="separator"><a class="key-icon active"></a></div>

<!--<div id="main-wrapper" class="flex-container">-->

<div class="mobile-header">
  <div class="nav-mobile-icon open"><span></span><span></span><span></span><span></span></div>
  <a class="button-title extended">notamuse</a>
</div>

<?php
snippet('navigation');
snippet('article');
?>
<!--</div>-->

<!-- overlay snippets -->
<div class="preview">
  <figure>
    <div class="aside-image">
      <img src=""/>
    </div>
  </figure>
</div>

<?php
snippet('intro');
snippet('about');
snippet('interview');
?>

<!-- marquee snippet (the marquee is the vertical notamuse banner on the right window edge) -->
<?php snippet('marquee'); ?>

<!-- footer with the closing html body tag -->
<?php snippet('footer'); ?>
