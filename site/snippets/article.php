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
                                            <?php
                                            $openwraptag = '<div class="question-title"><a>';
                                            $closewraptag = '</a><a class="key-icon"></a></div>';
                                            ?>
                                            <li class="question-item"><!-- list item of question -->
                                            <?= $openwraptag.$frage->frage()->kirbytext().$closewraptag ?>
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
                                                                    <?php echo $answer ?>
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