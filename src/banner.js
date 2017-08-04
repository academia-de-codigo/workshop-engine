var figlet = require('figlet');
var chalk = require('chalk');

var banner = {
     show: show
};

module.exports = banner;

function show(text) {
    console.log(chalk.cyan(figlet.textSync(text)));
}
