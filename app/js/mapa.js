angular.module("MapaApp",["ui-leaflet","ngAnimate","ngTouch","ui.bootstrap","mapaComponent","detalleComponent"]).controller("MapaController",["$scope","$http",function(e,o){function t(o,t){var a=t.target;a.setStyle({weight:2,color:"#666",fillColor:"white"}),a.bringToFront(),e.selectedCountry=o,e.valor=100}function a(o,t){function a(e){if(e.isError())return void alert("Error in query: "+e.getMessage()+" "+e.getDetailedMessage());var o={legend:"bottom",title:"Habitantes por Municipio por Sexo",vAxis:{minValue:0}},t=e.getDataTable(),a=new google.visualization.ColumnChart(document.getElementById("chart_div2"));a.draw(t,o)}e.pobInegi={CurrentValue:0},o=o.feature,e.propiedades=o.properties,console.log(o.properties.NOM_MUN);var r=new google.visualization.Query("https://docs.google.com/spreadsheets/d/1j_xtWMGX0lZCYU_XgONxCUPws5gc0LNAtFGxeUQfC10/edit?usp=sharing");r.setQuery('select A, C, D where A = "'+o.properties.NOM_MUN+'"'),r.send(a)}function r(o){propiedades={NOM_MUN:o},e.propiedades=propiedades}e.propiedades={NOM_MUN:""},angular.extend(e,{zacatecas:{lat:22.75,lng:-102.55,zoom:10},layers:{baselayers:{googleRoadmap:{name:"Google Streets",layerType:"ROADMAP",type:"google"},googleTerrain:{name:"Google Terrain",layerType:"TERRAIN",type:"google"},googleHybrid:{name:"Google Hybrid",layerType:"HYBRID",type:"google"},osm:{name:"OpenStreetMap",url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",type:"xyz"}}}}),o.get("Zacatecas.json").success(function(o,t){angular.extend(e,{geojson:{data:o,style:{fillColor:"darkgreen",weight:2,opacity:.5,color:"white",dashArray:"3",fillOpacity:.5},resetStyleOnMouseout:!0}})}),e.$on("leafletDirectiveGeoJson.myMap.mouseover",function(e,o){t(o.leafletObject.feature,o.leafletEvent)}),e.$on("leafletDirectiveGeoJson.myMap.click",function(e,o){a(o.leafletObject,o.leafletEvent)}),e.$on("prueba",function(e,o){r(o)})}]);