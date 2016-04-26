angular.module('MapaApp', ['ui-leaflet'])
.controller('MapaController', ['$scope', function($scope) {
  angular.extend($scope, {
    zacatecas: {
      lat: 23,
      lng: -102.7,
      zoom: 7
    },
    layers: {
      baselayers: {
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
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz',
        },
      },
    }
  });
}]);
