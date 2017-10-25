<?php snippet('header') ?>

    <h1><?= $page->title()->kirbytext() ?></h1>
    <main>
        <ul>
            <?php foreach ($page->children() as $interviews): ?>
                <a href="<?= $interviews->url() ?>"><?= $interviews->title()->html() ?></a>
                <br />
            <?php endforeach ?>
        </ul>
    </main>

<?php snippet('footer') ?>
