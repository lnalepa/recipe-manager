var recipeManagerControllers = angular.module('recipeManagerControllers', []);

recipeManagerControllers.controller('RecipesCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/recipe').success(function(data) {
    $scope.recipes = data;
  });

  $scope.orderProp = 'title';
}]);


recipeManagerControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    
  var recipeId = $routeParams.recipeId;
  
  $http.get('/api/recipe/'+ recipeId).success(function(data) {
    $scope.recipe = data;
  });
 
}]);

