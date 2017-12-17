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
        throw new Error('Invalid question type. Expecting \'list\', \'confirm\' or \'input\'');
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
    return function(answer) {
        var error = validator(answer);
        return error ? error : true;
    };
}
