angular.module("mapaComponent",[]).controller("mapaController",["$scope",function(e){function o(){var e=new google.visualization.Query("https://docs.google.com/spreadsheets/d/1j_xtWMGX0lZCYU_XgONxCUPws5gc0LNAtFGxeUQfC10/edit?usp=sharing");e.setQuery("select A, B"),e.send(n)}function n(o){function n(o){for(var n=l.getSelection(),a="",r=0;r<n.length;r++){var c=n[r];if(null!=c.row&&null!=c.column){var u=t.getFormattedValue(c.row,c.column);a+="poblacion = "+u+"\n"}else if(null!=c.row){var u=t.getFormattedValue(c.row,0);a+="{row:"+c.row+", column:none}; value (col 0) = "+u+"\n"}else if(null!=c.column){var u=t.getFormattedValue(0,c.column);a+="{row:none, column:"+c.column+"}; value (row 0) = "+u+"\n"}}""==a&&(a="nothing"),console.log(a),e.$parent.$parent.$broadcast("prueba","prueba")}if(o.isError())return void alert("Error in query: "+o.getMessage()+" "+o.getDetailedMessage());var a={legend:"none",title:"Total de Habitantes por Municipio",vAxis:{minValue:0}},t=o.getDataTable(),l=new google.visualization.ColumnChart(document.getElementById("chart_div"));l.draw(t,a),google.visualization.events.addListener(l,"select",n)}google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(o)}]).component("mapaComponent",{templateUrl:"./js/components/mapa-component/mapa-component.html",controller:"mapaController"});