var engine = require('..');

var world = engine.world;
var stage = engine.stage;
var prompt = engine.prompt;

/*
    Welcome Level
 */
var nameQuestion = prompt.makeInputQuestion('What is your name? ');
var ageQuestion = prompt.makeInputQuestion('What is your age? ');

var introStage = stage.create('welcome');
introStage.addQuestion(nameQuestion, printAnswer);
introStage.addQuestion(ageQuestion, printAnswer);

introStage.executeBefore(function() {
    world.showBanner('<Academia de Código_>');
    console.log('Welcome to the workshop, young <Beta Code Cadet>\n');
});

/*
    End Level
 */
var endStage = stage.create('end');
endStage.executeAfter(function() {
    world.showBanner('The End...');
});

/*
    Stage 1
 */
var s1Question1 = prompt.makeInputQuestion('stage 1 question 1:');
var s1Question2 = prompt.makeInputQuestion('stage 1 question 2:');
var stage1 = stage.create('stage1');
stage1.addQuestion(s1Question1, printAnswer);
stage1.addQuestion(s1Question2, printAnswer);


/*
    Stage 2
 */
var s2Question1 = prompt.makeInputQuestion('stage 2 question 1:');
var s2Question2 = prompt.makeInputQuestion('stage 2 question 2:');
var stage2 = stage.create('stage2');
stage2.addQuestion(s2Question1, printAnswer);
stage2.addQuestion(s2Question2, printAnswer);

/*
    Quit Stage
 */
var quitStage = stage.create('quit');
quitStage.executeBefore(world.quit);
world.addMenuStage(quitStage);

/*
    Register stages on world
 */
world.addBeforeStage(introStage);
world.addMenuStage(stage1);
world.addMenuStage(stage2);
world.addAfterStage(endStage);

world.setMenu('Where do you want to go next?');
world.run();

function printAnswer(answer) {
    console.log('you replied ' + answer);
}
