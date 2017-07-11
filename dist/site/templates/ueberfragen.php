<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <?php foreach ($page->children() as $ueberfragen): ?>
          <a href="<?= $ueberfragen->url() ?>"><?= $ueberfragen ->title()->html() ?></a>
          <br />
    <?php endforeach ?>
</main>

<?php snippet('footer') ?>
