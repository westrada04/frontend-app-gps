(function () {
    'use strict';

    angular
        .module('app.template')
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/template/template.tmpl.html'
            });
    }
})();
