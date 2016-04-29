angular.module('MapaApp', ['ui-leaflet', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'mapaComponent'])
.controller('MapaController', ['$scope', '$http', function($scope, $http) {

  // selector de layers
  angular.extend($scope, {
    zacatecas: {
      lat: 22.75,
      lng: -102.55,
      zoom: 10
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz',
        },
        googleRoadmap: {
          name: 'Google Streets',
          layerType: 'ROADMAP',
          type: 'google',
        },
        googleTerrain: {
          name: 'Google Terrain',
          layerType: 'TERRAIN',
          type: 'google',
        },
        googleHybrid: {
          name: 'Google Hybrid',
          layerType: 'HYBRID',
          type: 'google',
        },
      },
    }
  });

  // Get the countries geojson data from a JSON
  $http.get('Zacatecas.json').success(function(data, status) {
    angular.extend($scope, {
      geojson: {
        data: data,
        style: {
          fillColor: 'darkgreen',
          weight: 2,
          opacity: 0.5,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.5,
        },
        resetStyleOnMouseout: true,
      },
    });
  });

  // llama a la funcion contryMouseover
  $scope.$on('leafletDirectiveGeoJson.myMap.mouseover', function(ev, leafletPayload) {
    countryMouseover(leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
  });

  // Mouse over function, called from the Leaflet Map Events
  function countryMouseover(feature, leafletEvent) {
    var layer = leafletEvent.target;
    layer.setStyle({
      weight: 2,
      color: '#666',
      fillColor: 'white',
    });
    layer.bringToFront();
    $scope.selectedCountry = feature;
    $scope.valor = 100;    //console.log(feature);
  };

  // Click
  $scope.$on('leafletDirectiveGeoJson.myMap.click', function(ev, leafletPayload) {
    countryClick(leafletPayload.leafletObject, leafletPayload.leafletEvent);
  });
  function countryClick(country, event) {
    $scope.pobInegi = {
      CurrentValue: 0,
    };
    country = country.feature;  //console.log(country.properties);
    $scope.propiedades = country.properties;
  };
}]);
