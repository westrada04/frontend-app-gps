(function () {
    'use strict';

    angular
        .module('app.map')
        .factory('ConnectivityService', ConnectivityService);

    function ConnectivityService($cordovaNetwork) {
        var service = {
            isOnline: isOnline,
            ifOffline: isOffline
        };

        return service;

        function isOnline() {
            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline();
            } else {
                return navigator.onLine;
            }
        }

        function isOffline() {
            if (ionic.Platform.isWebView()) {
                return !$cordovaNetwork.isOnline();
            } else {
                return !navigator.onLine;
            }
        }
    }

})();
