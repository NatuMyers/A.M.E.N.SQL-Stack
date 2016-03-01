angular.module('materializeApp.services', []).factory('Movie', function($resource) {
  return $resource('http://192.34.58.131/rest/index.php/user/:uid', { uid: '@_uid' }, {
    update: {
      method: 'PUT'
    }
  });
});