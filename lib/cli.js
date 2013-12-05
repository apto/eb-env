/*
Command-line interface into eb-env.
*/

var opt = require('optimist');

var ebEnv = require('../');

var command;

/*
Map command-line arguments to eb-env utility functions.
@param {Object} argv Just the command-line arguments. In other words,
process.argv.slice(2).
*/
module.exports = function cli(argv) {
  // optimist likes to use real args
  var saveArgv = process.argv;
  process.argv = argv;

  argv = opt
    .usage('Elastic Beanstalk command-line tools.\nUsage: $0 <command>')
    .demand(1)

    .check(function (argv) {
      command = argv._ && argv._[0] && ebEnv.commands[argv._[0]] ? argv._[0] : null;
      if (command) {
        return true;
      }
      throw "Command not found.";
    })

    .argv;

  // done with optimist
  process.argv = saveArgv;

  ebEnv.commands[command]();
};