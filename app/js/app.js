'use strict';

/* App Module */

var recipeManagerApp = angular.module('recipeManagerApp', [
  'ngRoute',
  'recipeManagerControllers'
]);

recipeManagerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/recipes', {
        templateUrl: 'recipes.html',
        controller: 'RecipesCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: 'recipe-detail.html',
        controller: 'RecipeDetailCtrl'
      }).
      otherwise({
        redirectTo: '/recipes'
      });
  }]);