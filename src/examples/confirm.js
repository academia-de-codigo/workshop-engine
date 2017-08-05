var engine = require('..');

var confirmQuestion = engine.makeConfirmQuestion('Are you the hacker we are looking for?');

var stage = engine.createStage('test');
stage.addQuestion(confirmQuestion, function (answer) {

    if (answer) {
        console.log('Great, let\'s do some bad ass hacking!');
    } else {
        console.log('The coder\'s life is not for everyone. Get Lost!');
    }

});

var world = engine.createWorld();
world.addBeforeStage(stage);
world.run();
