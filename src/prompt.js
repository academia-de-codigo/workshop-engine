var prompt = {
    makeConfirmQuestion: buildConfirm,
    makeListQuestion: buildList,
    makeInputQuestion: buildInput
};

module.exports = prompt;

function buildConfirm(message) {
    return {
        type: 'confirm',
        name: 'question',
        message: message
    };
}

function buildInput(message) {
    return {
        type: 'input',
        name: 'question',
        message: message,
        setValidator: setValidator
    };
}

function buildList(options) {
    return {
        type: 'list',
        name: 'question',
        choices: options
    };
}

function setValidator(validator) {
    /* jshint -W040 */

    this.validate = function(answer) {
        var error = validator(answer);

        return error ? error : true;
    };
}
