(function () {
    'use strict';

    angular
        .module('app.login')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'app/login/login.tmpl.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    },
                    'menuSideLeft': {
                        templateUrl: 'app/menuSideLeft/menuSideLeft.tmpl.html',
                        controller: 'MenuSideLeftController',
                        controllerAs: 'vm'
                    }
                },
            });
    }
})();
