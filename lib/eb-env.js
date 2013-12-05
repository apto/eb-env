var fs = require('fs');
var Path = require('path');

var commands = {
  init: function () {
    if (!fs.existsSync('.ebextensions')) {
      fs.mkdirSync('.ebextensions');
    }
    var configFile = Path.join(__dirname, '../ebextensions/000_environment.config');
    var configFileContent = fs.readFileSync(configFile);
    fs.writeFileSync('.ebextensions/000_environment.config', configFileContent);
  }
};

exports.commands = commands;