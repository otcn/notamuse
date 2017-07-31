<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <?php foreach ($page->children() as $subquestions): ?>
        <a href="<?= $subquestions->url() ?>"><?= $subquestions ->title()->html() ?></a>
        <br />
    <?php endforeach ?>
</main>

<?php snippet('footer') ?>
