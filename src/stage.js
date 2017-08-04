/* jshint -W040 */
var error = require('./error');

var stage = {
    create: build
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

function addQuestion(question, cb) {

    this.questions.push({
        metadata: question,
        cb: cb
    });
}
