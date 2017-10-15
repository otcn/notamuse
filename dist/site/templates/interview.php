<?php snippet('header') ?>

    <h1><?= $page->title()->kirbytext() ?></h1>
    <section class="interview">
        <ul>
          <?php $plural = $page->interviewpartner(); ?>

            <?php foreach($page->Interview()->toStructure() as $interview): ?>
                <li id="<?php echo ($interview->fid()); ?>">
                    <div class="q">
                        <?php
                            if(!$interview->vorfrage()->empty()) {
                                echo $interview->vorfrage();
                            }
                            if($plural == '1') {
                                echo $interview->frage();
                            } else {
                                foreach($pages->find('themen')->grandchildren()->visible() as $frage)
                                if(strcasecmp($frage->title(), $interview->frage()) == 0) {
                                    echo $frage->alternative();
                                }
                            }
                        ?>
                    </div>
                    <div class="a">
                        <?php echo $interview->antwort()->html() ?>
                    </div>
                </li>
                <br/>
            </br/>
            <?php endforeach ?>
        </ul>
    </section>

<?php snippet('footer') ?>
