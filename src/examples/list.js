var engine = require('..');

var stage = engine.create({
    name: 'test',
    type: 'stage'
});

stage.addQuestion({
    message: 'Blue or Red pill?',
    type: 'list',
    options: ['BLUE', 'RED'],
    action: function(answer) {
        console.log('You\'ve chose the ' + answer + ' pill');
    }
});

engine.run();
