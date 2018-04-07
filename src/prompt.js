var error = require('./error');

var prompt = {
    confirm: buildConfirm,
    list: buildList,
    input: buildInput,
    types: {
        CONFIRM: 'confirm',
        LIST: 'list',
        INPUT: 'input'
    }
};

function QuestionBuilder(options) {

    if (!prompt[options.type]) {
        error.severe('Invalid question type. Expecting \'list\', \'confirm\' or \'input\' but got ' + options.type);
    }

    if (!options.message) {
        error.severe('Invalid input question, expecting \'message\' parameter');
    }

    return prompt[options.type](options);
}

module.exports = QuestionBuilder;

function buildConfirm(options) {
    return {
        type: prompt.types.CONFIRM,
        name: 'question',
        message: options.message
    };
}

function buildInput(options) {
    return {
        type: prompt.types.INPUT,
        name: 'question',
        message: options.message,
        validate: addValidator(options.validator)
    };
}

function buildList(options) {
    return {
        type: prompt.types.LIST,
        name: 'question',
        message: options.message,
        choices: options.options
    };
}

function addValidator(validator) {

    if (!validator) {
        return;
    }

    return function(answer) {
        var error = validator(answer);
        return error ? error : true;
    };
}
