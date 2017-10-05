<div class="content">
    <aside>
        <section id="fragen">
            <b><?php echo "Fragen" ?></b>

            <?php
                $questions = array();

                foreach($pages->find('themen')->grandchildren()->visible()->sortBy('title', 'asc') as $frage) {
                    array_push($questions, $frage->title());
                }
            ?>

            <ul>
                <li>
                    <?php
                        $openwraptag = '<b>';
                        $closewraptag = '</b>';
                        $currentLetter = '';

                        foreach ($questions as $question) {
                            $firstLetter = substr($question, 0, 1);
                            if ($firstLetter !== $currentLetter) {
                                echo $openwraptag.$firstLetter.$closewraptag;
                                $currentLetter = $firstLetter;
                            }

                            echo $question->kirbytext();
                        }
                    ?>
                </li>
            </ul>
        </section>





        <section id="interviews">
            <b> <?php echo "Interviews" ?></b>

            <?php
                foreach($pages->find('interviews')->children()->visible()->sortBy('title', 'asc') as $interview):
                ?>
                    <ul>
                        <li>
                            <p><?php echo $interview->title() ?></p>
                        </li>
                    </ul>
                <?php endforeach ?>
        </section>
    </aside>




    <article>
        <section id="themen">
            <ul><!-- main unordered list -->
                <?php
                    // create list of all categories that are actually in use (= attached to a question)
                    $categories = array();

                    foreach($pages->find('interviews')->children()->visible() as $interview) {
                        foreach($interview->interview()->toStructure() as $frage) {
                            if (!$frage->category()->empty()) {
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
                                    //$titles = array();

                                    foreach($pages->find('interviews')->children()->visible() as $interview) {
                                        foreach($interview->interview()->toStructure()->filterBy('category', $category) as $frage) {
                                            if (! in_array($frage->frage()->value(), $fragenDone)) {
                                                array_push($fragenDone, $frage->frage()->value());
                                                //array_push($titles, $interview->title()->value());
                                                ?>

                                                <?php

                                                    // determine link target for question
                                                    if ($frage->spezialfrage()->bool() == true) {
                                                        $openwraptag = '<a href="'.$interview->url().'#'.$frage->fid().'">';
                                                        $closewraptag = '</a>';
                                                    } else {
                                                        $openwraptag = '<b>';
                                                        $closewraptag = '</b>';
                                                    }
                                                ?>

                                                    <li><!-- list item of question -->
                                                        <?= $openwraptag.$frage->frage()->kirbytext().$closewraptag ?>

                                                        <ul><!-- unordered list of answers -->
                                                            <?php
                                                                $antworten = array();
                                                                $titles = array();

                                                                foreach($pages->find('interviews')->children()->visible() as $interview) {
                                                                    foreach($interview->interview()->toStructure()->filterBy('frage', $frage->frage()) as $random) {
                                                                        foreach($random->antwort()->toStructure() as $answer) {
                                                                            array_push($antworten, $answer->value());
                                                                            array_push($titles, $interview->title()->value());
                                                                        }
                                                                    }
                                                                }

                                                                foreach($antworten as $antwort):
                                                                ?>
                                                                    <li><!-- list item of answer -->
                                                                        <i>
                                                                            <?php
                                                                                foreach($titles as $title) {
                                                                                    echo $title;
                                                                                }
                                                                            ?>
                                                                        </i>
                                                                        <p><?= $antwort ?></p>


                                                                        <div></div>
                                                                    </li>
                                                                <?php endforeach ?>
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
