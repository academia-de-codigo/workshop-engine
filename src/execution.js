var Promise = require('bluebird');

var execution = {
    start: start,
    add: add,
    procedures: []
};

module.exports = execution;

function add(procedure) {

    if (!procedure || typeof procedure !== 'function') {
        return;
    }

    execution.procedures.push(Promise.method(procedure));
}

function start() {

    execution.procedures.reduce(function(acc, cur) {
        return acc.then(cur);
    }, Promise.resolve());

}
