var express = require("express");
var app = express();
var mochaShot = require('./mocha-shot.js');
var path = require('path');

app.get("/", function(req, res) {
    res.send({ message: "Hello, World!" });
});

app.get("/foo", function(req, res) {
    res.send({ message: "foo foo" });
});

app.get('/api', function(req, res) {
  res.send({
    version: '1.0.0'
  });
});

module.exports = app;

mochaShot.createTest('app');

//GET Tests

var description = '/api should return version number';
var route = '/api';
var input = 'res.body.version';
var expected = '1.0.0';
var moduleName = 'app';
var statusCode = 200;


mochaShot.getTest(description, route, input, expected, moduleName, statusCode);

var description = '/foo should send message';
var route = '/foo';
var input = 'res.body.message';
var expected = 'foo foo';
var moduleName = 'app';
var statusCode = 200;
mochaShot.getTest(description, route, input, expected, moduleName, statusCode);

var description = '/foo sends an object';
var route = '/foo';
var input = 'res.body';
var expected = { message: "foo foo" };
var moduleName = 'app';
var statusCode = 200;
mochaShot.getTest(description, route, input, expected, moduleName, statusCode);

var description = '/ should send Hello World message';
var route = '/';
var input = 'res.body.message';
var expected = 'Hello, World!';
var moduleName = 'app';
var statusCode = 200;
mochaShot.getTest(description, route, input, expected, moduleName, statusCode);