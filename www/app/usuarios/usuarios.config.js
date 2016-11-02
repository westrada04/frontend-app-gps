(function () {
    'use strict';

    angular
        .module('app.usuarios')
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.usuarios', {
                url: '/usuarios',
                views: {
                    'menuContent': {
                        cache: false,
                        templateUrl: 'app/usuarios/usuarios.tmpl.html',
                        controller: 'UsuariosController',
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
                    },
                    UserResponse: function (UsuariosService) {
                        return UsuariosService.getUsuarios()
                            .then(function (response) {
                                return response.data;
                            });
                    }
                },
            });
    }

})();
