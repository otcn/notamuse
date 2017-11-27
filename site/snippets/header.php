<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title>
    <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?> <?php echo $site->title()->html() ?>
  </title>

  <meta name="description" content="<?= $site->description()->html() ?>">

  <!--Load css-->
  <?php echo css(array(
    //'assets/css/index.css',
    'assets/css/normalize.css',
    'assets/css/style.css',
    'assets/css/mobile.css'
  )) ?>

  <!--Load jQuery-->
  <?php echo js('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js') ?>
  <!--Load js async-->
  <?php echo js(array(
    'assets/js/marquee.js',
    'assets/js/lib.js',
    'assets/js/classy-links.js', // must be placed before script.js
    'assets/js/script.js',
    'assets/js/question-id.js',
    'assets/js/key.js',
  ), true) ?>

</head>

<body>
