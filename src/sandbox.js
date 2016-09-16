var mochaShot = require('./mocha-shot.js');

//Hypothetical Module that retrieves and processes Flickr API data.
var FlickrFetcher;

FlickrFetcher = {
	greet: function(str){
        return 'hello '+str;
    },
    //Method that takes a photo object from Flickr and returns a string.
    photoObjToURL: function(photoObj) {
        return [ 'https://farm',
            photoObj.farm, '.staticflickr.com/', 
            photoObj.server, '/',
            photoObj.id, '_',
            photoObj.secret, '_b.jpg'
        ].join('');
    },
    transformPhotoObj: function(photoObj) {
    return {
        title: photoObj.title,
        url:   FlickrFetcher.photoObjToURL(photoObj)
        };
    },
    fetchFlickrData: function(apiKey, fetch) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
            + apiKey + '&text=pugs&format=json&nojsoncallback=1'
    return fetch(url).then(function(data) {
        return data;
    });
    },
    fetchPhotos: function(apiKey, fetch) {
    return FlickrFetcher.fetchFlickrData(apiKey, fetch).then(function(data) {
        return data.photos.photo.map(FlickrFetcher.transformPhotoObj);
    });
    }
};


module.exports = FlickrFetcher;

//MOCHA SHOT TESTS

//Create test for file: Pass in file name and path
//If folder/test.js does not exist, the method will create it
// Each file automatically gets a test to determine that the file and path exist

mochaShot.createTest('FlickrFetcher','../src/sandbox.js');

//Equal tests: Pass in description, inputed value, expected value

mochaShot.equal('50 should equal 50', 50, 50);
mochaShot.equal('50 should equal 50', true, true);
mochaShot.equal('40 string should equal 40 string', '40', '40');
mochaShot.equal('FlickrFetcher.test() should equal hello', FlickrFetcher.greet('Mike'), 'hello Mike');

//Eql test: Pass in description, inputed value, expected value

mochaShot.eql('Foo objects are equal', { foo: 'bar' }, { foo: 'bar' });

//Eql function test: Pass in description, input for method, expected value, and method
//Using example methods above...

mochaShot.eqlFunction('greet: Takes a name and says hello','Mike','hello Mike','FlickrFetcher.greet');

  var description = 'photoObjToURL: Takes a photo object from Flickr and returns a string.';
  var input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    '20160229090898',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
  var expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
  var method = 'FlickrFetcher.photoObjToURL';

  mochaShot.eqlFunction(description, input, expected, method);

var description = 'transformPhotoObj: Take a photo object and return an object with only title and URL';
var input = {
          id:       '25373736106',
          owner:    '99117316@N03',
          secret:   '146731fcb7',
          server:   '1669',
          farm:     2,
          title:    'Dog goes to desperate measure to avoid walking on a leash',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0
        };
var expected = {
          title: 'Dog goes to desperate measure to avoid walking on a leash',
          url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            };
var method = 'FlickrFetcher.transformPhotoObj'

mochaShot.eqlFunction(description, input, expected, method);












//To create a test for this file execute mochaShot.createTest('module_name', 'file_path')
     //mochaShot.createTest('FlickrFetcher','../src/sandbox.js');
        //Error handling tests
        //mochaShot.createTest('FlickrFetcher');
        // mochaShot.createTest('FlickrFetcher',{});

//mochaShot.method('description', inputed value, expected output);
     // mochaShot.equal('50 should equal 50', 50, 50);
     // mochaShot.equal('50 should equal 50', true, true);
     // mochaShot.equal('40 string should equal 40 string', '40', '40');
     // mochaShot.equal('FlickrFetcher.test() should equal hello', FlickrFetcher.greet('Mike'), 'hello Mike');
        //Error handling
        //mochaShot.equal('FlickrFetcher.greet() should equal hello', FlickrFetcher.test, 'hello Mike');
     
    
    // mochaShot.eql('Foo objects are equal', { foo: 'bar' }, { foo: 'bar' });

//mochaShot eql function method: mochaShot.eqlFunction('description', 'input', 'expected', 'method')

//   mochaShot.eqlFunction('greet: Takes a name and says hello','Mike','hello Mike','FlickrFetcher.greet');

  var description = 'photoObjToURL: Takes a photo object from Flickr and returns a string.';
  var input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    '20160229090898',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
  var expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
  var method = 'FlickrFetcher.photoObjToURL';

  //mochaShot.eqlFunction(description, input, expected, method);

var description = 'transformPhotoObj: Take a photo object and return an object with only title and URL';
var input = {
          id:       '25373736106',
          owner:    '99117316@N03',
          secret:   '146731fcb7',
          server:   '1669',
          farm:     2,
          title:    'Dog goes to desperate measure to avoid walking on a leash',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0
        };
var expected = {
          title: 'Dog goes to desperate measure to avoid walking on a leash',
          url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            };
var method = 'FlickrFetcher.transformPhotoObj'

//mochaShot.eqlFunction(description, input, expected, method);