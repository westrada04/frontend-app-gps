(function () {
    'use strict';

    angular
        .module('app.register')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('app.register', {
                url: '/registro',
                views: {
                    'menuContent': {
                        templateUrl: 'app/register/register.tmpl.html',
                        controller: 'RegisterController',
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
