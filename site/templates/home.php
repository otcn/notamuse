<!-- the following php places all snippets concerning the main stage -->
<?php

snippet('header');

snippet('aside');

snippet('article');

?>

<!-- the "separator" divides the main stage and the overlays. on click overlays close -->
<div id="separator"><a class="key-icon active"></a></div>


<!-- the following php places all snippets concerning the overlays -->
<?php

snippet('about');

snippet('intro');

/*
foreach($pages->visible() as $section) {
  snippet($section->uid(), array('data' => $section));
}
*/

?>

<!-- the following php places the marquee snippet. the marquee is the vertical notamuse banner on the right window edge. should this be placed directly in here or be placed as a snippet? -->
<?php
snippet('marquee');
?>
