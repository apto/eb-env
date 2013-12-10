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

var ebEnvTempFile = '/tmp/eb-env.json';
var copiedEbEnvTempFile = Path.join(__dirname, '../eb-env.json');

var load = function (ebEnvFile) {
  var env;
  if (!ebEnvFile) {
    if (!fs.existsSync(copiedEbEnvTempFile) && fs.existsSync(ebEnvTempFile)) {
      fs.writeFileSync(copiedEbEnvTempFile, fs.readFileSync(ebEnvTempFile));
    }
    env = require(copiedEbEnvTempFile);
  } else {
    env = require(ebEnvFile);
  }
  loadEnv(env);
};

var loadEnv = function (env) {
  exports.name = env.AWSEBEnvironmentName;
  var app = {};
  exports.app = app;
  app.sourceUrl = env.AppSource;

  var id = app.sourceUrl.substring(app.sourceUrl.indexOf('git-'));
  id = id.substring(4);
  id = id.substring(0, id.indexOf('?'));
  if (id.indexOf('-') > 0) {
    id = id.substring(0, id.indexOf('-'));
  }
  app.sourceId = id;
};

exports.commands = commands;
exports.load = load;

try {
  load();
} catch (e) {
  // No default environment file found. That's okay.
}