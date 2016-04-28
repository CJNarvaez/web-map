angular.module("MapaApp",["ui-leaflet","ngAnimate","ngTouch","ui.bootstrap"]).controller("MapaController",["$scope","$http",function(e,o){function t(o,t){var a=t.target;a.setStyle({weight:2,color:"#666",fillColor:"white"}),a.bringToFront(),e.selectedCountry=o,e.valor=100}function a(o,t){e.pobInegi={CurrentValue:0},o=o.feature,e.propiedades=o.properties}angular.extend(e,{zacatecas:{lat:22.75,lng:-102.55,zoom:10},layers:{baselayers:{osm:{name:"OpenStreetMap",url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",type:"xyz"},googleRoadmap:{name:"Google Streets",layerType:"ROADMAP",type:"google"},googleTerrain:{name:"Google Terrain",layerType:"TERRAIN",type:"google"},googleHybrid:{name:"Google Hybrid",layerType:"HYBRID",type:"google"}}}}),o.get("Zacatecas.json").success(function(o,t){angular.extend(e,{geojson:{data:o,style:{fillColor:"darkgreen",weight:2,opacity:.5,color:"white",dashArray:"3",fillOpacity:.5},resetStyleOnMouseout:!0}})}),e.$on("leafletDirectiveGeoJson.myMap.mouseover",function(e,o){t(o.leafletObject.feature,o.leafletEvent)}),e.$on("leafletDirectiveGeoJson.myMap.click",function(e,o){a(o.leafletObject,o.leafletEvent)})}]);