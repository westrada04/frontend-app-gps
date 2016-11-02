(function () {
    'use strict';

    angular
        .module('app.menuSideLeft')
        .controller('MenuSideLeftController', MenuSideLeftController);

    function MenuSideLeftController(AuthService) {
        var vm = this;

        vm.auth = AuthService.isAuthenticated();
        console.log('ahora auth es '+ vm.auth);

        vm.logout = logout;

        function logout() {
            AuthService.logout();
        }

    }

})();
