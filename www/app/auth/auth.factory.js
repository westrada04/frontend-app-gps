(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('AuthService', AuthService);

    function AuthService($auth, $localStorage, $q, $state, $timeout, toastr) {

        var service = {
            login: login,
            signup: signup,
            logout: logout,
            isAuthenticated: isAuthenticated,
            autehticatedUser: autehticatedUser,
            getUser: getUser
        };

        return service;

        function login(user) {
            $auth.login(user)
                .then(function (response) {
                    cacheSession(response);
                    $state.go('app.usuarios');
                    toastr.success('Sesion Iniciada con exito', 'Mensaje');
                }).catch(function (response) {
                    toastr.error('Email o Contraseña Invalida', 'Error');
                });
        };

        function signup(user) {
            $auth.signup(user)
                .then(function (response) {
                    cacheSession(response);
                }).catch(function (response) {

                });
        };

        function logout() {
            $auth.logout();
            uncacheSession();
            $state.go('app.login');
            toastr.info('Sesion Finalizada', 'Informacion');
        };

        function isAuthenticated() {
            return $auth.isAuthenticated();
        };

        function autehticatedUser() {
            var deferred = $q.defer();

            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {

                $timeout(function () {
                    $state.go('app.login');
                });

                deferred.reject();
            }

            return deferred.promise;
        };

        function getUser() {
            var user = {
                name: $localStorage.name,
                email: $localStorage.email,
                rol: $localStorage.rol
            };
            return user;
        };

        function cacheSession(response) {
            $localStorage.name = response.data.user.name;
            $localStorage.email = response.data.user.email;
            $localStorage.rol = response.data.user.rol;
        };

        function uncacheSession() {
            $localStorage.$reset();
        }
    }
})();
