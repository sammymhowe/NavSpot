var app = angular.module('NavSpot', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/events')
    .success(function(data) {
      $scope.events = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createEvent = function() {
    $http.post('/api/events', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.events = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}
