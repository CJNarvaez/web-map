angular.module('MapaApp', ['ui-leaflet', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'mapaComponent', 'detalleComponent'])
.controller('MapaController', ['$scope', '$http', function($scope, $http) {
  $scope.propiedades = {
    NOM_MUN: '',
  }

  // selector de layers
  angular.extend($scope, {
    zacatecas: {
      lat: 22.75,
      lng: -102.55,
      zoom: 10
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
    console.log(country.properties.NOM_MUN);

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1j_xtWMGX0lZCYU_XgONxCUPws5gc0LNAtFGxeUQfC10/edit?usp=sharing');
    query.setQuery('select A, C, D where A = "'+ country.properties.NOM_MUN + '"');
    query.send(handleQueryResponse);

    function handleQueryResponse(response) {
      if (response.isError()) {
          alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
      }
      // Set chart options
      var options = {
        legend: 'bottom',
        title: 'Habitantes por Municipio por Sexo',
        vAxis: { minValue: 0 }
      };
      var data = response.getDataTable();
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
      chart.draw(data, options);
    }

  };

  $scope.$on('prueba', function(ev, msg){
    //console.log($scope);
    cambia(msg);
  });
  function cambia(msg){
    propiedades = {
      NOM_MUN: msg,
    };
    $scope.propiedades = propiedades;
  }
}]);
