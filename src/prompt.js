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
        addValidation: addValidation
    };
}

function buildList(options) {
    return {
        type: 'list',
        name: 'question',
        choices: options
    };
}

//TODO: abstract weird inquirer validator logic
function addValidation(validator) {
    /* jshint -W040 */
    this.validate = validator;
}
