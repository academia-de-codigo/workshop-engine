var chalk = require('chalk');

var error = {
    severe: severe,
    warning: warning
};

module.exports = error;

var ERROR = 'ERROR: ';
var WARNING = 'WARN: ';

function severe(text) {
    log(ERROR + text, 'red');
    process.exit(1);
}

function warning(text) {
    log(WARNING + text, 'yellow');
}

function log(text, color) {
    console.log('\n' + chalk[color](text) + '\n');
}
