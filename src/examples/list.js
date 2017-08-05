var engine = require('..');

var listQuestion = engine.makeListQuestion('Red or Blue pill?', ['RED', 'BLUE']);

var stage = engine.createStage('test');
stage.addQuestion(listQuestion, function (answer) {
    console.log('The color of your pill is', answer);
});

var world = engine.createWorld();
world.addBeforeStage(stage);
world.run();
