'use strict';

angular.module('myApp.boarddetails', [ 'ngRoute', 'ngTagsInput' ])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/boarddetails', {
		templateUrl : 'app/views/boarddetails/boarddetails.html',
		controller : 'BoardDetailsCtrl'
	});
} ])

.controller('BoardDetailsCtrl',	[ '$scope', '$location', '$route', '$rootScope', 'User', 'Board', 'Game', 
                               	  function($scope, $location, $route, $rootScope, User, Board, Game) {

	var params = $location.search();
	
	$scope.createGameHref = '#/creategame?boardId=' + params.id;
	
	$scope.user = undefined;
	$scope.board = undefined;
	// assume true to avoid flickering.
	$scope.isMember = true;
	
	$rootScope.user.$promise.then(function(user){
		$scope.user = user;
		$scope.board = Board.get({id: params.boardId});
		$scope.board.$promise.then(function (board) {
			var isMember = false;
			jQuery.each(board.players, function(index, value) {
				if(value.userId === $scope.user.id) {
					isMember = true;
				}
				value.wp = value.matchesPlayed == 0 ? 0 : value.matchesWon / value.matchesPlayed * 100;
				value.wrp = value.matchesPlayedAsResistance == 0 ? 0 : value.matchesWonAsResistance / value.matchesPlayedAsResistance * 100;
				value.wsp = value.matchesPlayedAsSpy == 0 ? 0 : value.matchesWonAsSpy / value.matchesPlayedAsSpy * 100;
				
				value.wp = (Math.round(value.wp * 100, -2) / 100).toFixed(2);
				value.wrp = (Math.round(value.wrp * 100, -2) / 100).toFixed(2);
				value.wsp = (Math.round(value.wsp * 100, -2) / 100).toFixed(2);
				
				if(value.positionVariation > 0) {
					value.positionChangeMarker = '˄';
				}
				else if (value.positionVariation < 0){
					value.positionChangeMarker = '˅';
				}
			});
			$scope.isMember = isMember;
		});
	});
	
	$scope.joinBoard = function() {
		
		var player = {};
		
		player.userId = $scope.user.id;
		player.nickname = $scope.user.nickname;
		player.elo = 1500;
		player.matchesPlayed = 0;
		player.matchesWon = 0;
		player.matchesPlayedAsResistance = 0;
		player.matchesWonAsResistance = 0;
		player.matchesPlayedAsSpy = 0;
		player.matchesWonAsSpy = 0;
		
		$scope.board.players.push(player);
		
		Board.update({ id: $scope.board.id }, $scope.board, function() {
			alert('Success!');
			$route.reload();
		}, function() {
			alert('Failed!');
			$route.reload();
		});
	}
	
}]);
