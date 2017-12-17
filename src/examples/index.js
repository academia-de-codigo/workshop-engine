var engine = require('..');
var name;

/*
    Welcome Level
 */
var introStage = engine.create({
    name: 'welcome',
    type: 'before'
});

introStage.executeBefore(function() {
    engine.showBanner('<Academia de Código_>');
    console.log('Welcome to the workshop, young <Beta Code Cadet>\n');
});

var nameQuestion = introStage.addQuestion({
    type: 'input',
    message: 'What\'s your name?',
    validator: function(answer) {
        if (answer.length === 0) {
            return 'Don\'t be shy, tell me your name';
        }
    },
    action: function(answer) {
        name = answer;
        console.log('Welcome ' + name);
    }
});

/*
    End Level
 */
var endStage = engine.create({
    name: 'end',
    type: 'after'
});

endStage.executeAfter(function() {
    engine.showBanner('The End...');
});

/*
    Stage 1
 */
var stage1 = engine.create({
    name: 'stage 1',
    type: 'stage'
});

var s1Question1 = stage1.addQuestion({
    message: 'stage 1 question 1:',
    type: 'confirm',
    action: function(answer) {
        console.log('the answer to stage 1 question 1 is: ', answer);
    }
});

var s1Question2 = stage1.addQuestion({
    message: 'stage 1 question 2',
    type: 'list',
    options: ['batata', 'chourico'],
    action: function(answer) {
        console.log('the answer to stage 1 question 2 is: ', answer);
    }
});

/*
    Stage 2
 */
var stage2 = engine.create({
    name: 'stage 2',
    type: 'stage'
});

var s2Question1 = stage2.addQuestion({
    type: 'confirm',
    message: 'stage 2 question 1',
    action: function(answer) {
        console.log('answer to stage 2 question 1 is: ', answer);
    }
});

var s2Question1 = stage2.addQuestion({
    type: 'confirm',
    message: 'stage 2 question 2',
    action: function(answer) {
        console.log('answer to stage 2 question 2 is: ', answer);
    }
});

/*
    Quit Stage
 */
var quitStage = engine.create({
    name: 'quit',
    type: 'stage'
});

quitStage.executeBefore(engine.quit);

engine.setMenuPrompt('Where do you want to go next?');
engine.run();
