/* global describe, it, before */
/* jshint expr: true */

var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var rimraf = require('rimraf');
var ncp = require('ncp');
var q = require('q');
var Path = require('path');
var shell = require('shelljs');
var yaml = require('js-yaml');

require('mocha-as-promised')();
chai.use(require('chai-as-promised'));

rimraf = q.denodeify(rimraf);
ncp = q.denodeify(ncp);

var testInit = function (dir) {
  var projectDir = Path.join(__dirname, 'fixture/tmp', dir);
  it('should initialize ' + dir, function () {
    shell.pushd(projectDir);
    var command = 'node ' + Path.join(__dirname, '../bin/eb-env') + ' init';
    shell.exec(command);
    shell.popd();
    var configFile = Path.join(projectDir, '.ebextensions/000_environment.config');
    expect(fs.existsSync(configFile)).to.equal(true);
    var config = yaml.safeLoad(fs.readFileSync(configFile).toString());
    expect(config.files).to.be.ok;
    expect(config.files['/tmp/eb-env.json']).to.be.ok;
  });
};

var projectsDir = Path.join(__dirname, 'fixture/projects');
var tmpDir = Path.join(__dirname, 'fixture/tmp');

describe('command', function () {
  describe('init', function () {
    before(function () {
      return rimraf(tmpDir)
        .then(function () {
          return ncp(projectsDir, tmpDir);
        });
    });
    testInit('no-dir');
    testInit('no-config');
    testInit('has-config');
  });
});