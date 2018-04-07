var figlet = require('figlet');
var chalk = require('chalk');
var error = require('./error');

var banner = {
    show: show
};

module.exports = banner;

function show(text) {

    if (!text) {
        error.warning('banner requires text');
        return;
    }

    console.log(chalk.cyan(figlet.textSync(text)));
}
