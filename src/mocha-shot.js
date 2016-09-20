'use strict';
const fs = require('fs');
const mkdirp = require('mkdirp');
const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');
const appRootDir = require('app-root-dir').get();

const mochaShot = {};
const pathToTestFile = path.relative(path.join(__dirname), path.join(appRootDir, 'test/test.js'));

mochaShot.createTest = function (fileName) {
  if (fileName === undefined || typeof fileName !== 'string') {
    return console.log('Error: Must provide module name as a string (i.e. mochaShot.createTest("module_name")');
  }

  return fs.access(pathToTestFile, fs.F_OK, (err) => {
    if (!err) {
      const requirePath = '\nvar ' + fileName + ' = require(' + JSON.stringify(path.relative(path.join(appRootDir, 'test/'), module.parent.filename)) + ');\n';
      const escapedString = escapeStringRegexp(requirePath);
      return fs.readFile(pathToTestFile, 'utf8', (error, data) => {
        if (!data.match(escapedString)) {
          fs.appendFile(pathToTestFile, '\nvar ' + fileName + ' = require(' + JSON.stringify(path.relative(path.join(appRootDir, 'test/'), module.parent.filename)) + ');\n');
          const test = ['\n', 'describe(', JSON.stringify('File should exist'), ',', ' function(){', '\n  it(', JSON.stringify('Check that the file being test exists'), ', function() {\n  expect(' + fileName + ').to.not.be.undefined;\n  });\n', '});\n'].join('');
          return fs.appendFile(pathToTestFile, test);
        }
      });
    } else {
      // creates test folder if one does not exist
      mkdirp('../test');

      // creates test.js file and adds 'use strict' adds require('chai').expect
      fs.appendFile(pathToTestFile, JSON.stringify('use strict') + ';' + "\nvar expect = require('chai').expect;\n" + "\nvar request = require('supertest');\n");
      fs.appendFile(pathToTestFile, '\nvar ' + fileName + ' = require(' + JSON.stringify(path.relative(path.join(appRootDir, 'test/'), module.parent.filename)) + ');\n');
      const test = ['\n', 'describe(', JSON.stringify('File should exist'), ',', ' function(){', '\n  it(', JSON.stringify('Check that the file being test exists'), ', function() {\n  expect(' + fileName + ').to.not.be.undefined;\n  });\n', '});\n'].join('');
      return fs.appendFile(pathToTestFile, test);
    }
  });
};

mochaShot.equal = function (des, input, expected_output) {
  if (typeof input === 'function') { return console.log('Error: Cannot pass an unexecuted function as an input! Only numbers, strings, and booleans'); }
  const test = ['\n', 'describe(', JSON.stringify('Equality test for numbers, strings, or booleans'), ',', ' function(){', '\n  it(', JSON.stringify(des), ', function() {\n  expect(' + JSON.stringify(input) + ').to.equal(' + JSON.stringify(expected_output) + ');\n  });\n', '});\n'].join('');

  let escapedString = escapeStringRegexp(test);

  fs.readFile(pathToTestFile, 'utf8', (err, data) => {
    if (err) {
      return console.log('Error: Must create test file. Use mochaShot.createTest method (i.e. mochaShot.createTest("module_name")');
    }
    else if (!data.match(escapedString) && !err) {
      return fs.appendFile(pathToTestFile, test);
    }
  });
};

mochaShot.eql = function(des, inputObj, expected_outputObj) {
  let test = ['\n', 'describe( ', JSON.stringify('Equality test for objects or arrays'), ',', ' function(){', '\n  it(', JSON.stringify(des), ', function() {\n  expect(' + JSON.stringify(inputObj) + ').to.eql(' + JSON.stringify(expected_outputObj) + ');\n  });\n', '});\n'].join('');

  let escapedString = escapeStringRegexp(test);

  fs.readFile(pathToTestFile, 'utf8', (err, data) => {  
    if (err) {
      return console.log('Error: Must create test file. Use mochaShot.createTest method (i.e. mochaShot.createTest("module_name")');
    }
    else if (!data.match(escapedString) && !err) {
      return fs.appendFile(pathToTestFile, test);
    }
  });
};


mochaShot.eqlFunction = function (description, input, expected_value, method) {
  if (typeof method === 'function') { return console.log('Method argument must be passed in as a string'); }
  let test = ['\n', 'describe( ', JSON.stringify('Testing functionality of a module method'), ',', ' function(){', '\n  it(', JSON.stringify(description), ', function() {\n  var input = ' + JSON.stringify(input) + ';\n  var expected = ' + JSON.stringify(expected_value) + ';\n  var actual = ' + method + '(input);\n  expect(actual).to.eql(expected);\n  });\n', '});\n'].join('');

  let escapedString = escapeStringRegexp(test);

  fs.readFile(pathToTestFile, 'utf8', (err, data) => {
    if (err) {
      return console.log('Error: Must create test file. Use mochaShot.createTest method (i.e. mochaShot.createTest("module_name")');
    }
    else if (!data.match(escapedString) && !err) {
      return fs.appendFile(pathToTestFile, test);
    }
  });
};

//API get test.
mochaShot.getTest = function (description, route, input, expected, moduleName, statusCode) {
  if (typeof input !== 'string') { return console.log('Input must be passed in as a string'); }
  let test = ['\n', 'describe( ', JSON.stringify('API GET Test'), ',', ' function(){', '\n  it(', JSON.stringify(description), ', function(done) {\n    request(' + moduleName + ')\n      .get(' + JSON.stringify(route) + ')\n      .end(function(err, res){\n        expect(' + input + ').to.eql(' + JSON.stringify(expected) + ');\n        expect(res.statusCode).to.equal(' + statusCode + ');\n        done();\n      });\n  });\n});\n'].join('');

  let escapedString = escapeStringRegexp(test);

  fs.readFile(pathToTestFile, 'utf8', (err, data) => {
    if (err) {
      return console.log('Error: Must create test file. Use mochaShot.createTest method (i.e. mochaShot.createTest("module_name")');
    }
    else if (!data.match(escapedString) && !err) {
      return fs.appendFile(pathToTestFile, test);
    }
  });
};

module.exports = mochaShot;
