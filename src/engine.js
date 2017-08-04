var inquirer = require('inquirer');
var figlet = require('figlet');
var chalk = require('chalk');
var execution = require('./execution');

var LOADING = 'Loading game engine...\n';

var engine = {
    executeBefore: executeBefore,
    executeAfter: executeAfter,
    addStage: addStage,
    showBanner: showBanner,
    run: run,
    stages: []
};

module.exports = engine;

function executeBefore(procedure) {
    engine.before = procedure;
}

function executeAfter(procedure) {
    engine.after = procedure;
}

function addStage(stage) {
    engine.stages.push(stage);
}

function run() {

    console.log(LOADING);
    execution.add(engine.before);

    engine.stages.forEach(function (stage) {
        execution.add(stage.before);
        stage.questions.forEach(function (question) {
            execution.add(function () {
                return inquirer.prompt(question.metadata).then(function (answers) {
                    if (question.cb) {
                        question.cb(answers.question);
                    }
                });
            });
        });
        execution.add(stage.after);
    });

    execution.add(engine.after);
    execution.start();

}

function showBanner(text) {
    console.log(chalk.cyan(figlet.textSync(text)));
}
