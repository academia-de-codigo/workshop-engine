var engine = require('..');

var nameQuestion = engine.makeInputQuestion('Who are you?');
nameQuestion.setValidator(function (answer) {
    if (answer.length === 0) {
        return 'Don\'t be shy, tell me your name!';
    }
});

var stage = engine.createStage('test');
stage.addQuestion(nameQuestion, function(answer) {
    console.log('Welcome ' + answer);
});

var world = engine.createWorld();
world.addBeforeStage(stage);
world.run();
