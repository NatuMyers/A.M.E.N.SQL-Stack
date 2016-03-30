
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partial-dashboard.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partial-about.html'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'partial-register.html'
        });


    $httpProvider.interceptors.push('authInterceptor');

});




//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}

myApp.controller('userController', function ($scope, $http, $window) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.isAuthenticated = false;
  $scope.welcome = '';
  $scope.message = '';

  $scope.loginUser = function () {
    $http
      .post('/authenticate', $scope.user)
      // if you sucessfully post to authenticate, then auth = true locally!
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };

  $scope.logout = function () {
    $scope.welcome = '';
    $scope.message = '';
    $scope.isAuthenticated = false;
    delete $window.sessionStorage.token;
  };

  $scope.callRestricted = function () {
    $http({url: '/api/restricted', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });
  };





});



// user privileges -------------------------------------





myApp.controller('registerController', function ($scope, $resource) {
    $scope.registerUser = function () {

function pollController($scope, $resource) {
    var userConnection = $resource('/api/users/:id', {id: '@id'});

    $scope.saveEntry = function() {
    userConnection.save($scope.password);
        userConnection.save($scope.username);
        userConnection.save($scope.email);

    }
}




    /*
           // use $.param jQuery function to serialize data from JSON
            var data = $.param({
                hashword: $scope.password,
                username: $scope.username,
                email: $scope.email
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/api/users', data, config)
            .success(function (data, status, headers, config) {
                console.log("successful post");
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                console.log("failed post");
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

        */


        };




$scope.addCollab = function () {
    $http
      .post('/api/collabs', $scope.user)
      // if you sucessfully post to authenticate, then auth = true locally!
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };



$scope.updateUser = function () {

    var userOptions = $.param({
        firstName: $scope.userFirstName,
        lastName: $scope.userLastName,
        lastName: $scope.userFocus,
        lastName: $scope.userType
    });

    $http
      .put('/api/users?'+data)
      // if you sucessfully post to authenticate, then auth = true locally!
      .success(function (data, status, headers, config) {
        $scope.ServerResponse = data;
      })
      .error(function (data, status, headers, config) {
            $scope.ServerResponse =  htmlDecode("Data: " + data +
                "\n\n\n\nstatus: " + status +
                "\n\n\n\nheaders: " + header +
                "\n\n\n\nconfig: " + config);
      });
  };

});






















myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});


/*
 .controller('MainController', function($scope, $route, $routeParams, $location) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
    })


.controller('ResourceController',function($scope, Entry) {


  var entry = Entry.get({ id: $scope.id }, function() {
    console.log(entry);
  }); // get() returns a single entry

  var entries = Entry.query(function() {
    console.log(entries);
  }); //query() returns all the entries

  $scope.entry = new Entry(); //You can instantiate resource class

  $scope.entry.data = 'some data';

  Entry.save($scope.entry, function() {
    //data saved. do something here.
  }); //saves an entry. Assuming $scope.entry is the Entry object
})


.controller('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
    function ($scope, UsersFactory, UserFactory, $location) {

        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/user-detail/' + userId);
        };

        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
            UserFactory.delete({ id: userId });
            $scope.users = UsersFactory.query();
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/user-creation');
        };

        $scope.users = UsersFactory.query();
    }])



    .controller('CollapsibleController', ["$scope", function ($scope) {
        $scope.collapsibleElements = [{
            icon: 'mdi-image-filter-drama',
            title: 'First',
            content: 'Lorem ipsum dolor sit amet.'
        },{
            icon: 'mdi-maps-place',
            title: 'Second',
            content: 'Lorem ipsum dolor sit amet.'
        },{
            icon: 'mdi-social-whatshot',
            title: 'Third',
            content: 'Lorem ipsum dolor sit amet.'
        }];
    }]).controller('ToastController', ["$scope", function ($scope) {
        $scope.callback = function(message) {
            alert(message);
        };
    }]).controller('PaginationController', ["$scope", function ($scope) {
        $scope.changePage = function (page) {
            Materialize.toast("Changed to page " + page, 1000);
        }
    }])
    .controller('DateController', ["$scope", function ($scope) {
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        $scope.disable = [false, 1, 7];
        $scope.today = 'Today';
        $scope.clear = 'Clear';
        $scope.close = 'Close';
        var days = 15;
        $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
        $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
        $scope.onStart = function () {
            console.log('onStart');
        };
        $scope.onRender = function () {
            console.log('onRender');
        };
        $scope.onOpen = function () {
            console.log('onOpen');
        };
        $scope.onClose = function () {
            console.log('onClose');
        };
        $scope.onSet = function () {
            console.log('onSet');
        };
        $scope.onStop = function () {
            console.log('onStop');
        };
    }]);

*/
