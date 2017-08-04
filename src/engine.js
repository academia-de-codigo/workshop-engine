var inquirer = require('inquirer');
var figlet = require('figlet');
var chalk = require('chalk');
var execution = require('./execution');

var LOADING = 'Loading game engine...\n';

var engine = {
    addBefore: addBeforeStage,
    addAfter: addAfterStage,
    addMenu: addMenuStage,
    showBanner: showBanner,
    run: run,
    stages: []
};

module.exports = engine;

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

    console.log(LOADING);

    runStage(engine.before).then(function() {
        return runStage(engine.after);
    });


}

function runStage(stage) {

    execution.reset();

    execution.add(stage.before);
    stage.questions.forEach(function (question) {
        execution.add(function () {
            return inquirer.prompt(question.metadata)
                .then(function (answers) {
                    if (question.cb) {
                        question.cb(answers.question);
                    }
                });
        });
    });
    execution.add(stage.after);

    return execution.start();
}

function showBanner(text) {
    console.log(chalk.cyan(figlet.textSync(text)));
}
