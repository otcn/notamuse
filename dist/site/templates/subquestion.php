<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <?php foreach ($page->children() as $subquestion): ?>
        <article>
          <?= $subquestion->answer()->kirbytext() ?>
        </article>
    <?php endforeach ?>
</main>

<?php snippet('footer') ?>
