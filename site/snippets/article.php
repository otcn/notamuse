<div id="content-frame" class="flex-item">
    <article id="content">
        <section id="themen">
            <ul><!-- main unordered list -->
                <?php
                    // create list of all categories that are actually in use (= attached to a question)
                    $categories = array();

                    foreach($pages->find('interviews')->children()->visible() as $interview) {
                        foreach($interview->interview()->toStructure() as $frage) {
                            if($frage->category()->value() !== 'Spezifisch') {
                                array_push($categories, $frage->category()->value());
                            }
                        }
                    }

                    // remove duplicates
                    $categories = array_unique($categories);

                    foreach ($categories as $category):
                    ?>


                        <li><!-- list item of categorys, questions and answers -->
                            <h1><?= $category ?></h1>

                            <ul><!-- unordered list of questions -->
                                <?php
                                    $fragenDone = array();

                                    foreach($pages->find('interviews')->children()->visible() as $interview) {
                                        foreach($interview->interview()->toStructure()->filterBy('category', $category) as $frage) {
                                            if (! in_array($frage->frage()->value(), $fragenDone)) {
                                                array_push($fragenDone, $frage->frage()->value());
                                                ?>

                                                <?php
                                                    $openwraptag = '<b>';
                                                    $closewraptag = '</b>';
                                                ?>

                                                    <li><!-- list item of question -->
                                                        <?= $openwraptag.$frage->frage()->kirbytext().$closewraptag ?>

                                                        <ul><!-- unordered list of answers -->
                                                            <?php
                                                                foreach($pages->find('interviews')->children()->visible() as $interview) {
                                                                    foreach($interview->interview()->toStructure()->filterBy('frage', $frage->frage()) as $random) {
                                                                        foreach($random->antwort()->toStructure() as $answer) {
                                                                        ?>
                                                                        <li>
                                                                            <?php echo $answer ?>
                                                                        </li>

                                                                        <?php
                                                                        }
                                                                    }
                                                                }
                                                            ?>
                                                        </ul>
                                                    </li>
                                                <?php
                                            }
                                        }
                                    }
                                ?>
                            </ul>
                        </li>
                    <?php endforeach ?>
            </ul>
        </section>
    </article>
</div>