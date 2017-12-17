var engine = require('..');

var stage = engine.create({
    name: 'test',
    type: 'stage'
});

stage.addQuestion({
    message: 'Who are you?',
    type: 'input',
    validator: function(answer) {
        if (answer.length === 0) {
            return 'Don\'t be shy, tell me your name';
        }
    },
    action: function(answer) {
        if (answer) {
            console.log('Great!');
        } else {
            console.log('Get lost!');
        }
    }
});

engine.run();

