(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();



/*

// As you can see we just simply using Angular $http AJAX service to call our backend data model to retrieve and save data.


function userController($scope, $http) {
    $scope.users = [];
    $http.get('https://troop.tech/api/users').success(function(data, status, headers, config) {
        $scope.users = data;
        if (data == "") {
            $scope.users = [];
        }
    }).error(function(data, status, headers, config) {
        console.log("Ops: could not get any data");
    });

    $scope.addUser = function() {
        $http.post('https://troop.tech/api/users', {
            text : $scope.usernameText,
            done : false,
        }).success(function(data, status, headers, config) {
            $scope.users.push({
                text : $scope.usernameText,
                done : false
            });
            $scope.usernameText = '';
        }).error(function(data, status, headers, config) {
            console.log("Ops: " + data);
        });
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.users, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldusers = $scope.users;
        $scope.users = [];
        angular.forEach(oldusers, function(todo) {
            if (!todo.done)
                $scope.users.push(todo);
        });
    };
}


*/
