angular.module('mapaComponent', [])
.controller('mapaController', ['$scope', function($scope) {
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages': ['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1j_xtWMGX0lZCYU_XgONxCUPws5gc0LNAtFGxeUQfC10/edit?usp=sharing');
    query.setQuery('select A, B');
    query.send(handleQueryResponse);
/*
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
    chart.draw(data, options);*/
  }

  function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    // Set chart options
    var options = {
      legend: 'none',
      title: 'Total de Habitantes por Municipio',
      vAxis: { minValue: 0 }
    };

    var data = response.getDataTable();
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    // Every time the table fires the "select" event, it should call your
    // selectHandler() function.
    google.visualization.events.addListener(chart, 'select', selectHandler);
    function selectHandler(e) {
      var selection = chart.getSelection();
      var message = '';
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null && item.column != null) {
          var str = data.getFormattedValue(item.row, item.column);
          message += 'poblacion = ' + str + '\n';
        } else if (item.row != null) {
          var str = data.getFormattedValue(item.row, 0);
          message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
        } else if (item.column != null) {
          var str = data.getFormattedValue(0, item.column);
          message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
        }
      }
      if (message == '') {
        message = 'nothing';
      }
      console.log(message);
      $scope.$parent.$parent.$broadcast('prueba', 'prueba');
    }

  }
}])
.component('mapaComponent', {
  templateUrl: './js/components/mapa-component/mapa-component.html',
  controller: 'mapaController'
});
