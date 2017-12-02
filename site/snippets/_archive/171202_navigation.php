<div id="nav-frame" class="flex-item">
  <div id="nav" class="nav">
    <ul>
      <!-- MOBILE NAV HEADER -->
      <li class="nav-mobile-header">
        <a class="nav-button">notamuse</a>
        <div class="nav-mobile-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>

      <li class="nav-topics"><a id="topics-button" class="nav-button">Themen</a></li>

      <li>
        <a class="key-icon"></a>
        <a id="questions-button" class="nav-switch" href="#">Fragen</a>
          <?php
            function cmp($a, $b) {
              return strcmp( $a->question, $b->question );
            }
           ?>

          <div id="sl-1" class="sub">
            <ul>

              <?php
                // build an array of all unique question objects
                $fragenDone = array();
                $lettersDone = array();

                $allQuestionObjects = array();
                $uniqueQuestionObjects = array();

                $newLetter = false;

                foreach($pages->find('interviews')->children()->visible() as $interview) {
                  foreach($interview->interview()->toStructure() as $interviewUnit) {

                    $myQuestionObject = new stdClass; // create a new object to contain the following important question information

                    $myQuestion = $interviewUnit->frage(); // get the variable "frage" out of the "interviewUnit" object
                    $myIDString = (string)$myQuestion; // this is the string version of "myQuestion", which is needed to compare the myQuestionObjects
                    $myURL = $interview->url(); // get the variable "url" out of the "interview" object
                    $mySpecialAttribute = $interviewUnit->spezialfrage()->bool(); // get the boolean "spezialfrage" out of the "interviewUnit" object
                    $myQuestionID = $interviewUnit->fid(); // get the variable "fid" out of the "interviewUnit" object

                    // push properties to my new object:
                    $myQuestionObject->question = $myQuestion; // push question property to my new object
                    $myQuestionObject->IDstring = $myIDString;
                    $myQuestionObject->url = $myURL;
                    $myQuestionObject->specialAttribute = $mySpecialAttribute;
                    $myQuestionObject->qID = $myQuestionID;

                    array_push( $allQuestionObjects, $myQuestionObject ); // push new object into array

                    foreach( $allQuestionObjects as $questionObject ) {
                        // check if the element already exists in the unique array
                        if ( !array_key_exists( $questionObject->IDstring, $uniqueQuestionObjects ) ) {
                            $uniqueQuestionObjects[ $questionObject->IDstring ] = $questionObject;

                            // DEBUG output to console:
                            //echo "<script>console.log( '" . $myQuestion . "' );</script>";
                        }
                    }
                  }
                }

                // sort questions alphabetically
                usort($uniqueQuestionObjects, "cmp");


                // output
                foreach ($uniqueQuestionObjects as $questionObject) {



                  // determine link target for question
                  if ($questionObject->specialAttribute === true) {
                    $openwraptag = '<a href="' . $questionObject->url . '#' . $questionObject->qID . '">'; // link directly to interview page/section
                    $closewraptag = '</a>';

                    // DEBUG output to console:
                    //echo "<script>console.log( 'SPECIAL: " . $questionObject->url . '#' . $questionObject->qID . "' );</script>";

                  } else {
                    $openwraptag = '<a href="#' . $questionObject->qID . '">'; // link to question in topics
                    $closewraptag = '</a>';

                    // DEBUG output to console:
                    //echo "<script>console.log( 'REGULAR: " . $questionObject->qID . "' );</script>";

                  }
                  // new first letter? show it!
                  $letter = substr( $questionObject->question,0,1 );
                  if (! in_array($letter, $lettersDone)) {
                    array_push($lettersDone, $letter);
                    ?>
                    <li class="register-mark"><?= $letter?></li>
                    <?php
                    $newletter = true;
                  }
                  ?>
                  <li class="nav-question">
                    <?php echo $openwraptag.$questionObject->question.$closewraptag;?>
                  </li>
                  <?php
                }

              ?>
            </ul>
          </div>
      </li>

      <li>
        <a class="key-icon"></a>
        <a id="interviews-button" class="nav-switch" href="#">Interviews</a>
        <div id="sl-2" class="sub">
          <ul>
            <?php
            $lettersDone = array();
            $newLetter = false; // interviews need register mark as well
            foreach($pages->find('interviews')->children()->visible()->sortBy('title', 'asc') as $interview):

            // new first letter? show it!
            $letter = substr($interview->title(),0,1);
            if (! in_array($letter, $lettersDone)) {
              array_push($lettersDone, $letter);
              ?>
              <li class="register-mark"><?= $letter?></li>
              <?php
              $newletter = true;
            }
            ?>

            <li class="nav-interview">
              <a href="<?php echo $interview->url() ?>" imgsrc="<?php if($image = $interview->image()): ?><?php echo $image->url() ?><?php endif ?>">

                <?php if( !$interview->titlenav()->empty() ): ?>
                  <?php echo $interview->titlenav() ?>
                <?php else: ?>
                  <?php echo $interview->title() ?>
                <?php endif ?>

              </a>
            </li>
            <?php endforeach ?>
          </ul>
        </div>
      </li>

      <li class="nav-spacer"></li>
      <li class="nav-about"><a id="about-button" class="nav-button about-anchor">About</a></li>
      <li><a id="language-button" class="nav-button language-anchor">EN</a></li>

    </ul>
  </div>
</div>