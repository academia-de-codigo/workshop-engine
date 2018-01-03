var engine = require('..');

var stage = engine.create({
    name: 'test',
    type: 'stage'
});

stage.addQuestion({
    message: 'Are you the hacker we are looking for?',
    type: 'confirm',
    action: function(answer) {
        if (answer) {
            console.log('Great!');
        } else {
            console.log('Get lost!');
        }
    }
});

stage.addQuestion({
    message: 'Are you the hacker we are looking for?',
    type: 'confirm',
    action: function(answer) {
        if (answer) {
            console.log('Great!');
        } else {
            console.log('Get lost!');
        }
    }
});

engine.run();
