(function () {
    'use strict';

    angular
        .module('app.usuarios')
        .controller('UsuariosController', UsuariosController);

    function UsuariosController(UserResponse) {
        var vm = this;
        vm.users = UserResponse;
    }
})();
