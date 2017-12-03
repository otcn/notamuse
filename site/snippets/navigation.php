<div class="flex-item nav-container">

  <ul class="nav">

    <!-- MOBILE NAV HEADER -->
    <li class="nav-mobile-header">
      <div class="nav-button">
        <div class="nav-mobile-icon open">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a class="button-title">notamuse</a>
      </div>
    </li>

    <li>
      <div id="topics-button" class="nav-button">
        <a class="button-title">Themen</a>
      </div>
    </li>

    <li>
      <div id="questions-button" class="nav-button">
        <a class="key-icon"></a>
        <a  class="button-title">Fragen</a>
      </div>
      <div id="sl-1" class="sub">
        <?php
          function cmp($a, $b) {
            return strcmp( $a->question, $b->question );
          }
         ?>
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
      <div id="interviews-button" class="nav-button">
        <a class="key-icon"></a>
        <a  class="button-title">Interviews</a>
      </div>
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

    <li>
      <div id="about-button" class="nav-button">
        <a class="button-title">About</a>
      </div>
    </li>

    <li>
      <div id="language-button" class="nav-button">
        <a class="button-title">EN</a>
      </div>
    </li>

  </ul>
</div>