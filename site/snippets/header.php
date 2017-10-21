<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <!--Load css-->
  <?php echo css(array(
    'assets/css/index.css',
    'assets/css/normalize.css',
    'assets/css/style.css'
  )) ?>

  <!--Load js async-->
  <?php echo js(array(
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'assets/js/jens-scripts.js',
    'assets/js/script.js',
    'assets/js/marquee.js',
  ), true) ?>

</head>
<body>

<!-- Jens: Hi Tim, der Header-Schmu hier kann doch eigentlich weg, oder?
  <header class="header wrap wide" role="banner">
    <div class="grid">

      <div class="branding column">
        <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a>
      </div>

      <?php snippet('menu') ?>

    </div>
  </header>
-->
