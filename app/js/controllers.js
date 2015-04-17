'use strict';

/* Controllers */

var recipeManagerControllers = angular.module('recipeManagerControllers', []);

recipeManagerControllers.controller('RecipesCtrl', ['$scope', '$http',
  function($scope, $http) {
  	$scope.recipes = [
        {'name': 'Banana Bread',
         'date': '05/29/2014'},
        {'name': 'Mac n Cheese',
         'date': '09/13/2014'},
        {'name': 'Lasagna',
         'date': '06/14/2014'}
      ];
    // $http.get('recipes/recipes.json').success(function(data) {
    //   $scope.recipes = data;
    // });

    $scope.orderProp = 'name';
  }]);

recipeManagerControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.recipeId = $routeParams.recipeId;
  }]);

