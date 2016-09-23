# mocha-shot

Mocha-Shot is a way to create Mocha/Chai tests on-the-fly directly from your files. I was inspired to create Mocha-Shot when implementing Test Driven Development and wanted a way to generate Mocha tests as I coded and quickly generate tests without repeating myself.

Note: Examples below follows mocha shot folder structure and sample files provided.

To use mocha-shot:
  1. Add mocha-shot.js to your project or NPM install mocha-shot
  2. Require mocha-shot in the files you want to run tests
  
  ```javascript
  // If you have mocha-shot.js in your folder (Following the folder structure in mocha shot):
  var mochaShot = require('../src/mocha-shot.js');
  
  // If you NPM install:
  var mochaShot = require('mocha-shot');
  
  ```
  
  3. To add the file you want to test to your test.js file invoke createTest method.
  From sandbox.js file in sample folder:
  ```javascript
  mochaShot.createTest('flickrFetcher');
  ```
  If test/test.js does not exist, mocha-shot will dynamically create it for you.
  If test/test.js does exists, the file will be added to you test.js file:
  ```javascript
  var flickrFetcher = require("../sample/sandbox.js");
  ```

Mocha-Shot methods: Following the example provided in sandbox.js
  1. mochaShot.equal(description, value, expected value);
  
  Invoking:
  
  ```javascript
  mochaShot.equal('50 should equal 50', 50, 50);
  ```
  
  Generates the following in test.js:
  
  ```javascript
  describe("Equality test for numbers, strings, or booleans", function(){
    it("50 should equal 50", function() {
      expect(50).to.equal(50);
    });
  });
  ```
  
  2. mochaShot.eql(description, value, expected value);
  
  Invoking:
  
  ```javascript
  mochaShot.eql('Foo objects are equal', { foo: 'bar' }, { foo: 'bar' });
  ```
  
  Generates the following in test.js:
  
  ```javascript
  describe( "Equality test for objects or arrays", function(){
    it("Foo objects are equal", function() {
      expect({"foo":"bar"}).to.eql({"foo":"bar"});
    });
  });
  ```
  
  3. mochaShot.eqlFunction(description, method input, expected value, method being tested);
  
  Invoking:
  
  ```javascript
  var description = 'photoObjToURL: Takes a photo object from Flickr and returns a string.';
  var input = {
    id: '24770505034',
    owner: '97248275@N03',
    secret: '31a9986429',
    server: '1577',
    farm: 2,
    title: '20160229090898',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  };
  var expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
  var method = 'flickrFetcher.photoObjToURL';

  mochaShot.eqlFunction(description, input, expected, method);
  ```
  
  Generates the following in test.js:
  
  ```javascript
  describe( "Testing functionality of a module method", function(){
    it("photoObjToURL: Takes a photo object from Flickr and returns a string.", function() {
      var input = {"id":"24770505034","owner":"97248275@N03","secret":"31a9986429","server":"1577","farm":2,"title":"20160229090898","ispublic":1,"isfriend":0,"isfamily":0};
      var expected = "https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg";
      var actual = flickrFetcher.photoObjToURL(input);
      expect(actual).to.eql(expected);
    });
  });
  ```
