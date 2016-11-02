(function () {
    'use strict';

    angular
        .module('app', [
                'ngSanitize',
                'ngAnimate',
                'toastr',
                'ngStorage',
                'satellizer',
                'ionic',
                'ngCordova',
                'app.template',
                'app.menuSideLeft',
                'app.auth',
                'app.login',
                'app.register',
                'app.map',
                'app.usuarios'
        ]);
})();
