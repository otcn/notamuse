<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <?php foreach ($page->children() as $ueberfrage): ?>
          <a href="<?= $ueberfrage->url() ?>"><?= $ueberfrage ->title()->html() ?></a>
          <br />
    <?php endforeach ?>
</main>

<?php snippet('footer') ?>
