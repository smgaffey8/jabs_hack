var app = angular.module('pestMap', []);
app.controller('Mapping', mapping);

console.log('test');
mapping.$inject = ['$timeout', '$http'];

function mapping($timeout, $http){
    console.log('testing');
    var map = this;
    map.googledData= [];
    map.googledData.unshift(['Country', 'Popularity']);
    map.greeting = 'This will be the map injection!';
    map.years = ['2000', '2005', '2010', '2013'];
    map.yearSelected = map.years[0];

    map.getCountries = function getCountries($http) {
      map.countryPromise =
      $http.get('http://api.population.io:80/1.0/countries')
      .then(function success(res){
        console.log('success', res);
        map.countries = res.data.countries;

        return map.countryPromise.then(map.countries.forEach(function (country){
         setTimeout(map.getPopulation($http, map.yearSelected, country), 100);
        }));
      },
      function failure(res){
        console.log('error', res);
      });

    }



    map.getCountries($http);

    map.getPopulation = function getPopulation($http, year, country) {
      var total = 0;
      map.countryPromise.then(
        $http.get(`http://api.population.io:80/1.0/population/${year}/${country}`)
        .then(function success(res){
          ////console.log('success', res);
          total = res.data.reduce(function(c,p){
            //console.log(`c.total ${c.total} p.total ${p.total}`);
            return c + p.total;
          }, 0)
          map.googledData.push([country, total]);
          //console.log(`Country: ${country}, total: ${total}`);
        },
        function failure(res){
          console.log('error', res);
        })
      );
    }

    console.log(map.googledData);

// console.log("Yo");
// console.log(map.contries);
//     map.countryPromise.then(map.getPopulation($http, 2000, 'Argentina'));
//   //   map.countryPromise.then(map.countries.forEach(function (country){
//   //    setTimeout(map.getPopulation($http, map.yearSelected, country), 100);
  //  }));
  map.draw = function (){
    google.charts.load('upcoming', {'packages':['geochart']});
         google.charts.setOnLoadCallback(drawRegionsMap);

         function drawRegionsMap() {
           setTimeout(console.log("delay"), 5000);
              var data = google.visualization.arrayToDataTable(map.googledData);
          //  var data = google.visualization.arrayToDataTable([
           //
          //    ['Country', 'Popularity'],
          //    ['Germany', 200],
          //    ['United States', 300],
          //    ['Brazil', 400],
          //    ['Canada', 500],
          //    ['France', 600],
          //    ['RU', 700]
          //  ]);

           var options = {};

           var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

           chart.draw(data, options);
         }
  }

map.draw();

};


// google.charts.load('upcoming', {'packages':['geochart']});
//      google.charts.setOnLoadCallback(drawRegionsMap);
//
//      function drawRegionsMap() {
//        setTimeout(console.log("delay"), 5000);
//           var data = google.visualization.arrayToDataTable(map.googledData);
//       //  var data = google.visualization.arrayToDataTable([
//       //    ['Country', 'Popularity'],
//       //    ['Germany', 200],
//       //    ['United States', 300],
//       //    ['Brazil', 400],
//       //    ['Canada', 500],
//       //    ['France', 600],
//       //    ['RU', 700]
//       //  ]);
//
//        var options = {};
//
//        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
//
//        chart.draw(data, options);
//      }

// function countryController ($http, sharedData){
//   console.log("hello");
//   var cnt= this;
//   cnt.countries = sharedData.countries;
//   cnt.getCountries = function getCountries($http) {
//     $http.get('http://api.population.io:80/1.0/countries')
//     .then(function success(res){
//       console.log('success', res);
//       sharedData.countries = res.data.countries;
//     },
//     function failure(res){
//       console.log('error', res);
//     });
//   }
//   cnt.getCountries($http);
//
//
// }
