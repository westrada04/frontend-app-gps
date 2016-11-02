(function () {
    'use strict';

    angular
        .module('app.map')
        .factory('GoogleMapsService', GoogleMapsService);

    function GoogleMapsService($cordovaGeolocation, $ionicLoading, $cordovaNetwork, $rootScope, ConnectivityService, MapMarkersService) {

        var service = {
            init: init
        };

        return service;
        ///////////////////////////

        var apiKey = false;
        var map = null;

        function initMap() {

            var options = {
                timeout: 10000,
                enableHighAccuracy: true
            };

            $cordovaGeolocation.getCurrentPosition(options)
                .then(function (position) {

                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    var mapOptions = {
                        center: latLng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map(document.getElementById("map"), mapOptions);


                    //Esperar hasta que se carga el mapa
                    google.maps.event.addListenerOnce(map, 'idle', function () {
                        //carga de los marcadores

                        var image = 'img/beachflag.png';
                        // marcador donde estoy 
                        var marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: latLng,
                            icon: image
                        });

                        var perimetro = new google.maps.Circle({
                            center: marker.getPosition(),
                            radius: 500,
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.6,
                            strokeWeight: 1,
                            fillColor: "#FF0000",
                            fillOpacity: 0.35,
                            map: map
                        });

                        //notificacion de posicion     
                        var infoWindow = new google.maps.InfoWindow({
                            content: "Estas Aca!"
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.open(map, marker);
                        });

                        loadMarkers();
                        enableMap();
                    });

                }, function (error) {

                    console.log("no se ha podido obtener la localizacion");
                    // carga de los marcadores
                });
        }

        function enableMap() {
            $ionicLoading.hide();
        }

        function disableMap() {
            $ionicLoading.show({
                template: 'Debe estar conectado a Internet para ver este mapa.'
            });
        }

        function loadGoogleMaps() {
            $ionicLoading.show({
                template: 'Cargando Mapa'
            });

            //Esta función será llamada una vez que el SDK se ha cargado
            window.mapInit = function () {
                initMap();
            };

            //Crear un script para insertar en la pagina
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.id = "googleMaps";

            //tener en cuenta que el callback es la direcion url creada anteriormente
            if (apiKey) {
                script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey +
                    '&sensor=true&callback=mapInit';
            } else {
                script.src = 'http://maps.google.com/maps/api/js?sensor=true&callback=mapInit';
            }

            document.body.appendChild(script);
        }

        function checkLoaded() {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                loadGoogleMaps();
            } else {
                enableMap();
            }
        }

        function loadMarkers() {
            //Obtener todos los marcadores de Markers factory
            MapMarkersService.getMarkers()
                .then(function (markers) {

                    var records = markers.data;

                    for (var i = 0; i < records.length; i++) {

                        var record = records[i];
                        var markerPos = new google.maps.LatLng(record.lat, record.lng);

                        // Añadir el marcador al mapa
                        var marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: markerPos
                        });

                        var infoWindowContent = "<h4>" + record.name + "</h4>";

                        addInfoWindow(marker, infoWindowContent, record);
                    }
                });
        }

        function addInfoWindow(marker, message, record) {

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }

        function addConnectivityListeners() {
            console.log('entre');

            if (ionic.Platform.isWebView()) {
                console.log('entre2');
                // Comprobar si el mapa ya está cargado cuando el usuario se pone en línea,
                // si no, cargarlo
                $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                    checkLoaded();
                });
                // Desactivar el mapa cuando el usuario se desconecta
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    disableMap();
                });
            } else {
                //Igual que el anterior pero para cuando no se están ejecutando en un dispositivo
                window.addEventListener("online", function (e) {
                    checkLoaded();
                }, false);

                window.addEventListener("offline", function (e) {
                    disableMap();
                }, false);
            }
        }

        function init(Key) {
            if (typeof key != "undefined") {
                apiKey = key;
            }

            if (typeof google == "undefined" || typeof google.maps == "undefined") {

                console.warn("Google Maps SDK necesita ser cargado");

                disableMap();

                if (ConnectivityService.isOnline()) {
                    loadGoogleMaps();
                }

            } else {

                if (ConnectivityService.isOnline()) {
                    initMap();
                    enableMap();
                } else {
                    disableMap();
                }
            }

            addConnectivityListeners();
        }
    }
})();
