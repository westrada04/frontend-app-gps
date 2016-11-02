(function () {
    'use strict';

    angular
        .module('app.map')
        .config(moduleConfig)

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('app.map', {
                url: '/map',
                views: {
                    'menuContent': {
                        templateUrl: 'app/map/map.tmpl.html',
                        controller: 'MapController',
                        controllerAs: 'vm'
                    },
                    'menuSideLeft': {
                        templateUrl: 'app/menuSideLeft/menuSideLeft.tmpl.html',
                        controller: 'MenuSideLeftController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    auth: function (AuthService) {
                        return AuthService.autehticatedUser();
                    }
                },
            });
    }
})();
