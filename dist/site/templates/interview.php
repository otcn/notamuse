<?php snippet('header') ?>
<?
    print_r($site->questionCounter());

?>

    <h1><?= $page->title()->kirbytext() ?></h1>
    <main>
        <ul>
            <?php foreach($page->Interview()->toStructure() as $interview): ?>
                <li id="<?php echo urlencode($interview->frage()); ?>">
                    <div class="q">
                        <?php echo $interview->frage() ?>
                    </div>
                    <div class="a">
                        <?php echo $interview->antwort()->html() ?>
                    </div>
                </li>
            <?php endforeach ?>
        </ul>
    </main>

<?php snippet('footer') ?>
