(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig)
        .run(runConfig)
        .config(toastrConfig)

    .constant('API_BACKEND', {
        url: 'http://localhost/backend-rest/public'
    });

    function runConfig($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

    function toastrConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            positionClass: 'toast-bottom-right',
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    }

    function routeConfig($urlRouterProvider, $authProvider, API_BACKEND, $ionicConfigProvider) {

        $urlRouterProvider.otherwise('/app/login');
        $authProvider.loginUrl = API_BACKEND.url + '/auth/login';
        $authProvider.signupUrl = API_BACKEND.url + '/niño';
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp";
        //cache desactivado
        $ionicConfigProvider.views.maxCache(0);
    }
})();
