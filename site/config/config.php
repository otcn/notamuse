<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('debug', true);
/* c::set('panel.install', true); */



// update the created page with the ID after creating the page
kirby()->hook('panel.page.update', function($page){
    $questions = $page->Interview()->yaml();
    $newQuestions = array();

    foreach($questions as $question) {
        if ($question['fid'] == '') {

            $fidCounter = site()->questionCounter()->value();
            $fidCounter++;
            $question['fid'] = 'f'.$fidCounter;
            site()->update(array('questionCounter' => $fidCounter));

        }
        array_push($newQuestions, $question);
    }



    // update the created kirby page
    // DREAMCODE = $fidCounter;
    $page->update(array('Interview' => yaml::encode($newQuestions)));
});


//MULTI-LANGUAGE

c::set('language.detect', true);

c::set('date.handler', 'strftime');

c::set('languages', array(
  array(
    'code'    => 'en',
    'name'    => 'English',
    'locale'  => 'en_US',
    'url'     => '',
  ),
  array(
    'code'    => 'de',
    'name'    => 'Deutsch',
    'default' => true,
    'locale'  => 'de_DE',
    'url'     => '/',
  ),
));


