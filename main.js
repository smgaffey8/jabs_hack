angular.module('pestMap', []);
angular.module('pestMap')
    .controller('Mapping', mapping);

console.log('test');
mapping.$inject = ['$timeout']

function mapping($timeout){
    console.log('testing');
    var map = this;
    map.greeting = 'This will be the map injection!';
};

// function initMap() {
//         // Create a map object and specify the DOM element for display.
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           scrollwheel: false,
//           zoom: 8
//         });
//       }


google.charts.load('upcoming', {'packages':['geochart']});
     google.charts.setOnLoadCallback(drawRegionsMap);

     function drawRegionsMap() {

       var data = google.visualization.arrayToDataTable([
         ['Country', 'Popularity'],
         ['Germany', 200],
         ['United States', 300],
         ['Brazil', 400],
         ['Canada', 500],
         ['France', 600],
         ['RU', 700]
       ]);

       var options = {};

       var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

       chart.draw(data, options);
     }
