/*
 * @directive 'map'
 * @description Google Maps
 * @example:
 * <div id="map_canvas" class="google-maps"></div>
 * Giving the div an id="map_canvas" fix problems with twitter bootstrap affecting google maps
 */

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

            // Pan to map to marker
            $scope.panMap = function() {
                var latLng = new google.maps.LatLng($scope.latitude, $scope.longitude);
                map.panTo(latLng);
                map.setZoom(10);

                $scope.clearMarker();
            };

            // Removes Marker from Map
            $scope.clearMarker = function() {
                if(markersArray) {
                    for (var i in markersArray) {
                        markersArray[i].setMap(null);
                    }
                }
            };

            // Set Marker
            $scope.setMarker = function() {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                    map: map,
                    draggable: false
                });

                markersArray.push(marker);
            };
        }
    };
});
