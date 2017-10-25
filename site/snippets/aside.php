<aside>
    <section id="fragen">
        <b>Fragen</b>
        <?php
            // build an array of all unique question objects
            $fragenDone = array();
            $lettersDone = array();
            $newLetter = false;

            foreach($pages->find('interviews')->children()->visible() as $interview) {
            	foreach($interview->interview()->toStructure()->sortBy('frage') as $frage) {

                	// make sure we show each question only once
          	        if (! in_array($frage->frage(), $fragenDone)) {
						array_push($fragenDone, $frage->frage());

						// determine link target for question
						if ($frage->spezialfrage()->bool() === true) {
							// special questions are bold to be recognizable in the frontend
						    $openwraptag = '<a href="'.$interview->url().'#'.$frage->fid().'">';
						    $closewraptag = '</a>';
						} else {
						    $openwraptag = '<a href="#">';
						    $closewraptag = '</a>';
						}

						// new first letter? show it!
						$letter = substr($frage->frage(),0,1);
						if (! in_array($letter, $lettersDone)) {
							array_push($lettersDone, $letter);

							// are we starting a new letter? close the old one's ul element!
							if (!$newLetter) {echo '</ul>'; }
						?>

							<h3><?= $letter?></h3>
							<ul>
						<?php
							$newletter = true;
						}

						?>

						<li class="nav-question">
							<?php echo $openwraptag.$frage->frage()->kirbytext().$closewraptag;?>
						</li>
						<?php
					}
				}
			}
       ?>
    </section>

    <section id="interviews">
        <b> <?php echo "Interviews" ?></b>

        <?php
            foreach($pages->find('interviews')->children()->visible()->sortBy('title', 'asc') as $interview):
            ?>
                <ul>
                    <li>
                        <a href="<?php $interview->url() ?>"><?php echo $interview->title() ?></a>
                    </li>
                </ul>
            <?php endforeach ?>
    </section>
</aside>
