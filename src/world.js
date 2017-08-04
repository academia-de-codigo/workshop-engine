var Promise = require('bluebird');
var inquirer = require('inquirer');
var figlet = require('figlet');
var chalk = require('chalk');
var execution = require('./execution');

var LOADING = 'Loading game engine...\n';

var engine = {
    quit: quit,
    setMenu: setMenu,
    addBeforeStage: addBeforeStage,
    addAfterStage: addAfterStage,
    addMenuStage: addMenuStage,
    showBanner: showBanner,
    run: run,
    stages: []
};

module.exports = engine;

function setMenu(text) {
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

            console.log('\n');
            return runMenu();

        })
        .then(function () {
            console.log('\n');
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

function showBanner(text) {
    console.log(chalk.cyan(figlet.textSync(text)));
}

function quit() {
    engine.stop = true;
}
