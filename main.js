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
