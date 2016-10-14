var app = angular.module('pestMap', ['ngRoute']);
app.factory("sharedData", sharedDataFact);
app.controller('Mapping', mapping);
app.config(Router);
app.controller('countryCtrl', countryController);

countryController.$inject = ["$http"];
Router.$inject = ['$routeProvider'];


    function Router ($routeProvider){
      $routeProvider
        .when("/year", {
          templateUrl: "/map1.html"
        })
        .otherwise({
          redirectTo:"/year"
        });
        // sharedData.year = year;
    }

console.log('test');
mapping.$inject = ['$timeout', 'sharedData'];

function mapping($timeout, sharedData){
    console.log('testing');
    var map = this;
    map.greeting = 'This will be the map injection!';
    map.years = ['1902', '1903', '1957', '1905', '1958'];
};

// function initMap() {
//         // Create a map object and specify the DOM element for display.
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           scrollwheel: false,
//           zoom: 8
//         });
//       }

function sharedDataFact(){
  console.log("enter shared data");
  var year = {};
  return {year};
}

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
console.log("bye");
function countryController ($http){
  console.log("hello");
  var cnt= this;
  cnt.stuff = {};
  cnt.getInfo = function getInfo($http) {
    $http.get('http://api.population.io:80/1.0/countries')
    .then(function success(res){
      console.log('success', res);
    },
    function failure(res){
      console.log('error', res);
    });
  }
  cnt.getInfo($http);

}
