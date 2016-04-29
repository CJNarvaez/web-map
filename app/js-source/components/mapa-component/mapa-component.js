angular.module('mapaComponent', [])
.controller('mapaController', function() {
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages': ['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Municipio');
    data.addColumn('number', 'Habitantes');
    data.addRows([
      ['Zacatecas', 3],
      ['Guadalupe', 1]
    ]);

    // Set chart options
    var options = {'title': 'Habitantes por Municipio',
                   'width': 250,
                   'height': 150};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
})
.component('mapaComponent', {
  templateUrl: '/js/components/mapa-component/mapa-component.html',
  controller: 'mapaController'
});
