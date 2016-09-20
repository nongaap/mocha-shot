var mochaShot = require('../src/mocha-shot.js');

//Hypothetical Module that retrieves and processes Flickr API data.
var flickrFetcher;

flickrFetcher = {
	greet: function(str){
    return 'hello '+str;
  },
  
  photoObjToURL: function(photoObj) {
    return [ 
      'https://farm',
      photoObj.farm, '.staticflickr.com/', 
      photoObj.server, '/',
      photoObj.id, '_',
      photoObj.secret,
      '_b.jpg'
    ].join('');
  },
  
  transformPhotoObj: function(photoObj) {
    return {
      title: photoObj.title,
      url:   flickrFetcher.photoObjToURL(photoObj)
    };
  },
  
  fetchFlickrData: function(apiKey, fetch) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=pugs&format=json&nojsoncallback=1'
    return fetch(url).then(function(data) {
      return data;
    });
  },
    
  fetchPhotos: function(apiKey, fetch) {
    return flickrFetcher.fetchFlickrData(apiKey, fetch).then(function(data) {
      return data.photos.photo.map(flickrFetcher.transformPhotoObj);
    });
  }
};


module.exports = flickrFetcher;

//MOCHA SHOT TESTS

// mochaShot.createTest('string'): Pass in the name of the file to be required in test.js 
// If test folder and test.js does not exist the method will automatically create test.js file

//Uncomment to invoke createTest
  //mochaShot.createTest('flickrFetcher');

//Equal tests: Pass in description, inputed value, expected value
//Once test.js file is created, uncomment mochaShot.equal to create tests on the fly.
  // mochaShot.equal('50 should equal 50', 50, 50);
  // mochaShot.equal('50 should equal 50', true, true);
  // mochaShot.equal('40 string should equal 40 string', '40', '40');
  // mochaShot.equal('flickrFetcher.test() should equal hello', flickrFetcher.greet('Mike'), 'hello Mike');

//Eql test: Pass in description, inputed value, expected value
//Once test.js file is created, uncomment mochaShot.eql to create object tests on the fly.
  // mochaShot.eql('Foo objects are equal', { foo: 'bar' }, { foo: 'bar' });

//Eql function test: Pass in description, input for method, expected value, and method
  
  //mochaShot.eqlFunction('greet: Takes a name and says hello','Mike','hello Mike','flickrFetcher.greet');

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

  // mochaShot.eqlFunction(description, input, expected, method);

  var description = 'transformPhotoObj: Take a photo object and return an object with only title and URL';
  var input = {
    id: '25373736106',
    owner: '99117316@N03',
    secret: '146731fcb7',
    server: '1669',
    farm: 2,
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  };
  var expected = {
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    url:  'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            };
  var method = 'flickrFetcher.transformPhotoObj'

  // mochaShot.eqlFunction(description, input, expected, method);
