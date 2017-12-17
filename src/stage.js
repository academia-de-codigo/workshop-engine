/* jshint -W040 */
var error = require('./error');
var questionBuilder = require('./prompt');

var stage = {
    build: build
};

module.exports = stage;

function build(name) {
    if (!name) {
        error.warning('stage should have a name');
    }

    return {
        name: name,
        executeBefore: executeBefore,
        executeAfter: executeAfter,
        addQuestion: addQuestion,
        questions: []
    };
}

function executeBefore(procedure) {
    this.before = procedure;
}

function executeAfter(procedure) {
    this.after = procedure;
}

function addQuestion(options) {
    var type = options.type;
    var message = options.message;
    var cb = options.action;
    var listOptions = options.options;
    var validator = options.validator;

    var question = questionBuilder({
        type: type,
        message: message,
        options: listOptions,
        validator: validator
    });

    this.questions.push({
        metadata: question,
        cb: cb
    });

    return question;
}
