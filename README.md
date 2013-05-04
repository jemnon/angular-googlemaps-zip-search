# Angular.js Google Maps Zip Code Search Module

# Description
 - This module takes any valid zip code and plots a google maps marker

# Controller
function GoogleMapsCtrl($scope, $http) {
    'use strict';

    $scope.setZip = function() { 
        $scope.currentZip = $scope.zip.value;
        $scope.geocodeZip();
    };

    $scope.geocodeZip = function() {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({address: $scope.currentZip},
        function(results_array, status) { 
            if(status === 'OK') {
                var lat = results_array[0].geometry.location.lat();
                var lng = results_array[0].geometry.location.lng();

                $scope.latitude  = lat;
                $scope.longitude = lng;

                $scope.panMap();
            }    
        });
    };
}

# Directive
googleMapsApp.directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function($scope, element, attrs) {            
            var defaultLatLng = new google.maps.LatLng(37.5483, -122.1);
            
            var myOptions = {
                center: defaultLatLng,
                zoom: 10,
                zoomControl: false,
                scrollwheel: false,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map          = new google.maps.Map(document.getElementById(attrs.id), myOptions),
                geocoder     = new google.maps.Geocoder(),
                markersArray = [];

            // Set Marker
            $scope.setMarker = function() {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                    map: map,
                    draggable: false
                });
            };

            // Pan to map to marker
            $scope.panMap = function() {
                var latLng = new google.maps.LatLng($scope.latitude, $scope.longitude);
                map.panTo(latLng);
                map.setZoom(10);

                $scope.setMarker();
            };
        }
    };
});

# Lisence
The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
