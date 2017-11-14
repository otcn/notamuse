<!-- the following php places the header with css and js links and the opening html body tag -->
<?php snippet('header'); ?>

<div id="main-wrapper" class="flex-container">
    <!-- the following php places all snippets concerning the main stage -->
    <?php
    //snippet('aside'); // old navigation
    snippet('navigation');
    snippet('article');
    ?>
</div>

<!-- the "separator" divides the main stage and the overlays. on click overlays close -->
<div id="separator" class="hidden"><a class="key-icon active"></a></div>

<!-- overlay snippets -->
<div class="preview"><figure><img src=""/></figure></div>
<?php
snippet('intro');
snippet('about');
snippet('interview');
?>

<!-- marquee snippet (the marquee is the vertical notamuse banner on the right window edge) -->
<?php snippet('marquee'); ?>

<!-- footer with the closing html body tag -->
<?php snippet('footer'); ?>
