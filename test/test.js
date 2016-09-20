"use strict";
var expect = require('chai').expect;

var request = require('supertest');

var flickrFetcher = require("../sample/sandbox.js");

describe("File should exist", function(){
  it("Check that the file being test exists", function() {
  expect(flickrFetcher).to.not.be.undefined;
  });
});

describe( "Testing functionality of a module method", function(){
  it("greet: Takes a name and says hello", function() {
  var input = "Mike";
  var expected = "hello Mike";
  var actual = flickrFetcher.greet(input);
  expect(actual).to.eql(expected);
  });
});

describe("Equality test for numbers, strings, or booleans", function(){
  it("50 should equal 50", function() {
  expect(50).to.equal(50);
  });
});

describe("Equality test for numbers, strings, or booleans", function(){
  it("flickrFetcher.test() should equal hello", function() {
  expect("hello Mike").to.equal("hello Mike");
  });
});

describe("Equality test for numbers, strings, or booleans", function(){
  it("50 should equal 50", function() {
  expect(true).to.equal(true);
  });
});

describe("Equality test for numbers, strings, or booleans", function(){
  it("40 string should equal 40 string", function() {
  expect("40").to.equal("40");
  });
});

describe( "Equality test for objects or arrays", function(){
  it("Foo objects are equal", function() {
  expect({"foo":"bar"}).to.eql({"foo":"bar"});
  });
});

describe( "Testing functionality of a module method", function(){
  it("photoObjToURL: Takes a photo object from Flickr and returns a string.", function() {
  var input = {"id":"24770505034","owner":"97248275@N03","secret":"31a9986429","server":"1577","farm":2,"title":"20160229090898","ispublic":1,"isfriend":0,"isfamily":0};
  var expected = "https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg";
  var actual = flickrFetcher.photoObjToURL(input);
  expect(actual).to.eql(expected);
  });
});

describe( "Testing functionality of a module method", function(){
  it("transformPhotoObj: Take a photo object and return an object with only title and URL", function() {
  var input = {"id":"25373736106","owner":"99117316@N03","secret":"146731fcb7","server":"1669","farm":2,"title":"Dog goes to desperate measure to avoid walking on a leash","ispublic":1,"isfriend":0,"isfamily":0};
  var expected = {"title":"Dog goes to desperate measure to avoid walking on a leash","url":"https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg"};
  var actual = flickrFetcher.transformPhotoObj(input);
  expect(actual).to.eql(expected);
  });
});

var app = require("../sample/server.js");

describe("File should exist", function(){
  it("Check that the file being test exists", function() {
  expect(app).to.not.be.undefined;
  });
});

describe( "API GET Test", function(){
  it("/ should send Hello World message", function(done) {
    request(app)
      .get("/")
      .end(function(err, res){
        expect(res.body.message).to.eql("Hello, World!");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe( "API GET Test", function(){
  it("/foo should send message", function(done) {
    request(app)
      .get("/foo")
      .end(function(err, res){
        expect(res.body.message).to.eql("foo foo");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe( "API GET Test", function(){
  it("/api should return version number", function(done) {
    request(app)
      .get("/api")
      .end(function(err, res){
        expect(res.body.version).to.eql("1.0.0");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe( "API GET Test", function(){
  it("/foo sends an object", function(done) {
    request(app)
      .get("/foo")
      .end(function(err, res){
        expect(res.body).to.eql({"message":"foo foo"});
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
