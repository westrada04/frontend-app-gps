(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController(AuthService) {

        var vm = this;

        vm.login = login;
        vm.usuario = {};

        function login() {
            AuthService.login(vm.usuario);
        }
    }
})();
