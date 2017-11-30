<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title>
    <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?>
  </title>

  <meta name="description" content="<?= $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords() ?>">


  <!--Load css-->
  <?php echo css(array(
    //'assets/css/index.css',
    'assets/css/normalize.css',
    'assets/css/style.css'
  )) ?>

  <!--Load jQuery-->
  <?php echo js('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js') ?>
  <!--Load js async-->
  <?php echo js(array(
    'assets/js/smoothy.js',
    'assets/js/marquee.js',
    'assets/js/lib.js',
    'assets/js/script.js',
    'assets/js/classy-links.js',
    'assets/js/question-id.js'
  ), true) ?>

</head>

<body>
