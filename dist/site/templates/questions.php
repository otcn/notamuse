<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <?php foreach ($page->children() as $questions): ?>
        <a href="<?= $questions->url() ?>"><?= $questions ->title()->html() ?></a>
        <br />
    <?php endforeach ?>
</main>

<?php snippet('footer') ?>
