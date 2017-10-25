<?php

snippet('header');

snippet('aside');

snippet('article');

/*
foreach($pages->visible() as $section) {
  snippet($section->uid(), array('data' => $section));
}
*/

?>

<!-- marquee is the vertical notamuse banner on the right window edge. should this be placed directly in here or be placed as a snippet? -->
<?php
snippet('marquee');
?>
