(function () {
    'use strict';

    angular
        .module('app.map')
        .factory('MapMarkersService', MapMarkersService);

    function MapMarkersService($http, $q, API_BACKEND) {
        var service = {
            getMarkers: getMarkers
        };

        return service;

        function getMarkers() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post(API_BACKEND.url + '/seguidos')
                .then(function (response) {
                    defered.resolve(response);
                }, function (response) {
                    defered.reject(response);
                });

            return promise;
        }

    }

})();
