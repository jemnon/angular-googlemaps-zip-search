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