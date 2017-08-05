var Promise = require('bluebird');
var inquirer = require('inquirer');
var chalk = require('chalk');
var stage = require('./stage');
var execution = require('./execution');

var LOADING = 'Loading game engine...\n';

var engine = {
    stageFactory: stage,
    quit: quit,
    setMenuPrompt: setMenuPrompt,
    addBeforeStage: addBeforeStage,
    addAfterStage: addAfterStage,
    addMenuStage: addMenuStage,
    run: run,
    stages: []
};

module.exports = engine;

function setMenuPrompt(text) {
    engine.text = text;
}

function addBeforeStage(stage) {
    engine.before = stage;
}

function addAfterStage(stage) {
    engine.after = stage;
}

function addMenuStage(stage) {
    engine.stages.push(stage);
}

function run() {

    console.log(chalk.grey(LOADING));

    runStage(engine.before)
        .then(function () {

            return runMenu();

        })
        .then(function () {
            return runStage(engine.after);
        });
}

function runStage(stage) {

    execution.reset();

    if (stage) {

        execution.add(stage.before);
        runQuestions(stage.questions);
        execution.add(stage.after);
    }

    return execution.start();
}

function runQuestions(questions) {

    if (!questions) {
        return;
    }

    var moreQuestions = true;
    questions.forEach(function (question) {
        execution.add(function () {

            if (!moreQuestions) {
                return Promise.resolve();
            }

            return inquirer.prompt(question.metadata)
                .then(function (answers) {
                    if (question.cb) {
                        moreQuestions = question.cb(answers.question);
                    }
                });
        });
    });
}

function runMenu() {

    var options = engine.stages.map(function (stage) {
        return stage.name;
    });

    if (options.length === 0) {
        return Promise.resolve();
    }

    return inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: engine.text || 'Choose an option:',
            choices: options
        })
        .then(function (answers) {

            var stage = engine.stages.filter(function (stage) {
                return stage.name === answers.menu;
            })[0];

            return runStage(stage);

        })
        .then(function () {

            if (engine.stop) {
                return Promise.resolve();
            }

            return runMenu();

        });
}

function quit() {
    engine.stop = true;
}
