var Promise = require('bluebird');
var inquirer = require('inquirer');
var chalk = require('chalk');
var stage = require('./stage');
var execution = require('./execution');

var LOADING = 'Loading game engine...\n';

var engine = {
    create: create,
    quit: quit,
    setMenuPrompt: setMenuPrompt,
    run: run,
    stage: [],
    before: [],
    after: []
};

module.exports = engine;

function create(options) {
    if (!engine[options.type]) {
        throw new Error(
            'Invalid Stage type, expecting: \'stage\', \'before\' or \'after\''
        );
    }

    var built = stage.build(options.name);
    engine[options.type].push(built);

    return built;
}

function setMenuPrompt(text) {
    engine.text = text;
}

function run() {
    console.log(chalk.grey(LOADING));

    Promise.each(engine.before, runStage)
        .then(runMenu)
        .then(function () {
            return Promise.each(engine.after, runStage);
        });
}

function runStage(stage) {
    if (!stage) {
        throw new Error('Stage cannot be false');
    }

    execution.reset();

    var questions = true;
    var beforeRetValue;
    if (stage.before) {
        beforeRetValue = stage.before();
        if (beforeRetValue === false) {
            questions = false;
        }
    }

    if (questions) {
        runQuestions(stage.questions);
    }
    execution.add(stage.after);

    return execution.start();
}

function runQuestions(questions) {
    if (!questions) {
        return;
    }

    var moreQuestions = true;
    questions.forEach(function (question) {
        execution.add(function () {
            if (!moreQuestions || engine.stop) {
                return Promise.resolve();
            }

            return inquirer.prompt(question.metadata).then(function (answers) {
                var questionRetVal;
                if (question.cb) {
                    questionRetVal = question.cb(answers.question);
                    if (questionRetVal === false) {
                        moreQuestions = false;
                    }
                }
            });
        });
    });
}

function runMenu() {
    var options = engine.stage.map(function (stage) {
        return stage.name;
    });

    if (options.length === 0 || engine.stop) {
        return Promise.resolve();
    }

    return inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            message: engine.text || 'Choose an option:',
            choices: options
        })
        .then(function (answers) {
            var stage = engine.stage.find(function (stage) {
                return stage.name === answers.menu;
            });

            return runStage(stage);
        })
        .then(runMenu);
}

function quit() {
    engine.stop = true;
}
