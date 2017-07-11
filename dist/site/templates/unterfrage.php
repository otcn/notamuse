<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>
<main>

  <?php foreach ($page->children()->sortby('sort', 'asc') as $answer): ?>

    <article>
      <?= $answer->answer()->kirbytext() ?>
    </article>

  <?php endforeach ?>
</main>

<?php snippet('footer') ?>
