/* global describe, it, before */
/* jshint expr: true */

var chai = require('chai');
var expect = chai.expect;
var q = require('q');
var Path = require('path');

var ebEnv = require('../')

var fakeCommitId = 'a30d69b7a9609b10bf1a76111c520eac2d27c6b4';

require('mocha-as-promised')();
chai.use(require('chai-as-promised'));

var ebEnvFile = Path.join(__dirname, 'fixture/eb-env.json');

describe('eb-env', function () {
  describe('load', function () {
    it('should load env info', function () {
      ebEnv.load(ebEnvFile);
      expect(ebEnv.name).to.equal('my-sample-env');
      expect(ebEnv.app.sourceUrl.indexOf(fakeCommitId) > 0).to.equal(true);
      expect(ebEnv.app.sourceId).to.equal(fakeCommitId);
    });
  });
});