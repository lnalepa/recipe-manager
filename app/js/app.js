var recipeManagerApp = angular.module('recipeManagerApp', [
  'ngRoute',
  'recipeManagerControllers'
]);

recipeManagerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/recipes', {
        templateUrl: '/partials/recipes.html',
        controller: 'RecipesCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: '/partials/recipe-detail.html',
        controller: 'RecipeDetailCtrl'
      }).
      otherwise({
        redirectTo: '/recipes'
      });
  }]);