<?php snippet('header') ?>

<h1><?= $page->title()->kirbytext() ?></h1>

<main>
    <ul>
        <?php foreach($page->links()->toStructure() as $index): ?>
            <li>
                <?php echo $index->links()->kirbytext() ?>
            </li>
        <?php endforeach ?>
    </ul>
</main>

<?php snippet('footer') ?>
