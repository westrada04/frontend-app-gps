(function () {
    'use strict';

    angular
        .module('app.usuarios')
        .factory('UsuariosService', UsuariosService);

    function UsuariosService($q, $http, API_BACKEND) {
        var service = {
            getUsuarios: getUsuarios
        };

        return service;

        function getUsuarios() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post(API_BACKEND.url + '/seguidos')
                .then(function (response) {
                    defered.resolve(response);
                }, function (resolve) {
                    defered.reject(resolve);
                });
            return promise;
        }
    }
})();
