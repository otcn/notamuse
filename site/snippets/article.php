<div id="content-frame" class="flex-item">
    <article id="content">
        <ul class="topic-list parent"><!-- main unordered list -->
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

            <li class="topic-item"><!-- list item of categorys, questions and answers -->
                <div class="topic-title"><a><?= $category ?></a><a class="key-icon"></a></div>
                <ul class="question-list child parent"><!-- unordered list of questions -->

                    <?php
                    $fragenDone = array();
                    foreach($pages->find('interviews')->children()->visible() as $interview){
                        foreach($interview->interview()->toStructure()->filterBy('category', $category) as $frage){
                            if (! in_array($frage->frage()->value(), $fragenDone)) {
                                array_push($fragenDone, $frage->frage()->value());
                                ?>

                                <li class="question-item"><!-- list item of question -->
                                    <div class="question-title">
                                        <a id="<?= $frage->fid()->html() ?>"><?= $frage->frage()->html() ?></a><a class="key-icon"></a>
                                    </div>

                                    <ul class="answer-list child"><!-- unordered list of answers -->
                                    <?php
                                    foreach($pages->find('interviews')->children()->visible() as $interview) {
                                        foreach($interview->interview()->toStructure()->filterBy('frage', $frage->frage()) as $random) {
                                            foreach($random->antwort()->toStructure() as $answer) {
                                                ?>
                                                <li class="answer-item">
                                                    <a class="interviewee-title">
                                                    <!--Amanda Haas-->
                                                    <?= $interview->title()->html() ?>
                                                    </a>
                                                    <p>
                                                        <?php //echo $answer ?> <!-- echoes whole answer -->
                                                        <?php echo $answer->excerpt(300) ?> <!-- echoes excerpt of 300 chars of answer -->
                                                    </p>
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
    </article>
</div>