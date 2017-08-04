var engine = require('../engine');
var stage = require('../stage');
var prompt = require('../prompt');

var nameQuestion = prompt.makeInputQuestion('What is your name? ');
var ageQuestion = prompt.makeInputQuestion('What is your age? ');

var introStage = stage.create('welcome');
introStage.addQuestion(nameQuestion, function(answer) {
    console.log('Your name is ' + answer);
});

introStage.addQuestion(ageQuestion, function(answer) {
    console.log('Your age is ' + answer);
});

introStage.executeBefore(function() {
    engine.showBanner('<Academia de Código_>');
});

var endStage = stage.create('end');
endStage.executeAfter(function() {
    engine.showBanner('The End...');
});

engine.addStage(introStage);
engine.addStage(endStage);
engine.run();
