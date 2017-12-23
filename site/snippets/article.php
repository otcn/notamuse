<!--<div id="content-frame" class="flex-item topics-container"> -->

<!--code for the "no-flex" solution -->
<div class="topics-container">

    <!--code for the "no-flex" solution -->
    <!--<article id="content">-->

        <ul class="topic-list parent"><!-- main list -->
            <?php
            // create list of all categories that are actually in use (= attached to a question)
            $categories = array();
            foreach($pages->find('interviews')->children()->visible()->filterBy('visibility', '!=', '0') as $interview) {
            // "->filter(function($child){return $child->content(site()->language()->code())->exists();})" fetch children in the current language only
            // "->filterBy('visibility', '!=', '0')" fetch files with the checkbox 'visibility' checked
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
                    foreach($pages->find('interviews')->children()->visible()->filterBy('visibility', '!=', '0') as $interview){
                    // "->filter(function($child){return $child->content(site()->language()->code())->exists();})" fetch children in the current language only
                    // "->filterBy('visibility', '!=', '0')" fetch files with the checkbox 'visibility' checked
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
                                    foreach($pages->find('interviews')->children()->visible()->filterBy('visibility', '!=', '0') as $interview) {
                                    // "->filter(function($child){return $child->content(site()->language()->code())->exists();})" fetch children in the current language only
                                    // "->filterBy('visibility', '!=', '0')" fetch files with the checkbox 'visibility' checked
                                        foreach($interview->interview()->toStructure()->filterBy('frage', $frage->frage()) as $interviewUnit) {

                                            ?>
                                            <li class="answer-item">

                                                <a href="<?php echo $interview->url() ?>" class="interviewee-title" imgsrc="<?php if($image = $interview->image()): ?><?php echo $image->url() ?><?php endif ?>">

                                                    <?php if( !$interview->titlenav()->empty() ): ?>
                                                      <?php echo $interview->titlenav() ?>
                                                    <?php else: ?>
                                                      <?php echo $interview->title() ?>
                                                    <?php endif ?>

                                                </a>

                                                <?php echo $interviewUnit->antwort()->kirbytext() ?> <!-- echoes whole answer -->

                                            </li>
                                            <?php

                                            /* The following, original code seems to contain one loop to many, which leads to the wrong output of the answer */

                                            /*
                                            foreach($interviewUnit->antwort()->toStructure() as $answer) { //->toStructure()
                                                ?>
                                                <li class="answer-item">

                                                    <a href="<?php echo $interview->url() ?>" class="interviewee-title" imgsrc="<?php if($image = $interview->image()): ?><?php echo $image->url() ?><?php endif ?>">
                                                        <!--Name Surname-->
                                                        <?php echo $interview->title() ?>
                                                    </a>

                                                    <?php echo $answer->kirbytext() ?> <!-- echoes whole answer -->

                                                </li>
                                                <?php
                                            }
                                            */

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

    <!--</article>-->
</div>
