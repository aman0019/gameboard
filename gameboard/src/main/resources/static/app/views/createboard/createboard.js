'use strict';

angular.module('myApp.createboard', ['ngRoute', 'ngTagsInput'])

.config(['$routeProvider', function($routeProvider) {
	 $routeProvider.when('/createboard', {templateUrl: 'app/views/createboard/createboard.html', controller: 'CreateboardCtrl'});
}])

.controller('CreateboardCtrl', ['$scope', 'User', function($scope, User) {

	var _selected;

  $scope.tags = undefined;
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
                   'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
                   'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 
                   'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 
                   'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
                   'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  $scope.users = User.query({nicknameOnly: 'true'});
  
  $scope.getMatchingStates = function(query) {
	  return jQuery.grep($scope.users, function(n, i) {
		  if(n.indexOf(query) > -1) {
			  return true;
		  }
		  return false;
	  });
  }
  
  $scope.createBoard = function() {
	  console.log(JSON.stringify($scope.tags));
  }
	
}]);
