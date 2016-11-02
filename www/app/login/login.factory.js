(function () {
    'use strict';

    angular
        .module('app.login')
        .factory('AuthService2', AuthService2);

    function AuthService2($auth, $localStorage) {

        var service = {
            login: login,
            signup: signup,
            logout: logout,
            isAutheticated: isAuthenticated
        };

        return service;

        function login(user) {
            $auth.login(user)
                .then(function (response) {
                    cacheSession(response);
                }).catch(function (response) {

                });
        }

        function signup(user) {
            $auth.signup(user)
                .then(function (response) {

                }).catch(function (response) {

                });
        }

        function logout() {
            $auth.logout();
            uncacheSession();
        }

        function isAuthenticated() {
            return $auth.isAutheticated;
        }

        function cacheSession(response) {
            console.log(response);
        }

        function uncacheSession() {
            $localStorage.$reset();
        }
    }
})();
