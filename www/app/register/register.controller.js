(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    function RegisterController(AuthService) {
        var vm = this;
        vm.usuario = {};
        vm.registrar = registrar; 
        
        function registrar(){
            AuthService.signup(vm.usuario);
        }
        
    }
})();
