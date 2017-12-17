var Promise = require('bluebird');
var error = require('./error');

var execution = {
    start: start,
    add: add,
    reset: reset,
    procedures: []
};

module.exports = execution;

function add(procedure) {

    if (!procedure) {
        return;
    }

    if (!isProcedure(procedure)) {
        error.warning('invalid procedure');
        return;
    }

    execution.procedures.push(Promise.method(procedure));
}

function start() {
    return execution.procedures.reduce(function(acc, cur) {
        return acc.then(cur);
    }, Promise.resolve());

}

function reset() {
    execution.procedures = [];
}

function isProcedure(object) {
    return object && typeof object === 'function';
}
