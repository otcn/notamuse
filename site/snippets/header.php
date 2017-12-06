<!--
  notamuse
  notamuse
  notamuse
-->

<!DOCTYPE HTML>
<html lang="<?= site()->language() ? site()->language()->code() : 'de' ?>">
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title>
    <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?>
  </title>

  <meta name="description" content="<?= $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords() ?>">
  <!-- Social media -->
  <meta property="og:url" content="http://en.notamuse.de/">
  <meta property="og:title" content="notamuse">
  <meta property="og:image" content="icon.png">
  <meta property="og:description" content="A New Perspective on Graphic Design">
  <!-- For IE 11, Chrome, Firefox, Safari, Opera -->
  <link rel="icon" type="image/png" sizes="16x16" href="icon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="icon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="icon-96x96.png">

  <!-- Apple Touch Icon 180×180px -->
  <link rel="apple-touch-icon" href="icon.png">
  <!-- remove mobile top bar / launch fullscreen -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes">

  <!--Load css-->
  <?php echo css(array(
    //'assets/css/index.css',
    'assets/css/normalize.css',
    'assets/css/style.css'
  )) ?>

  <!--Load jQuery-->
  <?php echo js(array(
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'assets/js/classy-links.js',
    'assets/js/lib.js',
    'assets/js/script.js'
  )) ?>
  <!--Load js async-->
  <?php echo js(array(
    'assets/js/smoothy.js',
    'assets/js/mobile.js',
    'assets/js/mobilenav.js',
    'assets/js/marquee.js'
  ), true) ?>

</head>

<body>
