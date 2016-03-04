var app = angular.module('myApp', ['ui.materialize','ngResource','ui.router', '$stateProvider', '$locationProvider', '$urlRouterProvider'])

        'use strict';

        .config( function($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
                    $urlRouterProvider.otherwise('/about');

                    // PAGES

                    $stateProvider

                        .state('index', {
                        url: '/index',
                        templateUrl: '../index.html',
                    })

                        .state('email', {
                        url: '/email',
                        templateUrl: '../pages/email.html',
                        controller: 'EmailController'
                    })


                    .state('about', {
                        url: '/about',
                        templateUrl: '../pages/about.html',
                        controller: 'AboutController'
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: '../pages/login.html',
                        controller: 'LoginController'
                    })

                    .state('signup', {
                        url: '/signup',
                        templateUrl: '../pages/signup.html',
                        controller: 'SignUpController'
                    })

                    .state('search', {
                        url: '/search',
                        templateUrl: '../pages/search.html',
                        controller: 'SearchController'
                    })

                    .state('feedback', {
                        url: '/feedback',
                        templateUrl: '../pages/feedback.html',
                        controller: 'FeedbackController'
                    })

                    .state('feedback', {
                        url: '/map',
                        templateUrl: '../pages/map.html',
                        controller: 'MapController'
                    })

                    .state('tos', {
                        url: '/tos',
                        templateUrl: '../pages/tos.html',
                        controller: 'tosController'
                    })

                   $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    })

                    $provide.decorator('$sniffer', function($delegate) {
                        $delegate.history = false;
                        return $delegate;
                    });

                })



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
