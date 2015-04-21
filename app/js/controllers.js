var recipeManagerControllers = angular.module('recipeManagerControllers', []);

recipeManagerControllers.controller('RecipesCtrl', ['$scope', '$http',
  function($scope, $http) {
      $scope.recipes = [
        {'id':'1',
         'tags':['dessert','fruit'],
         'ingredients':[{qty: 4, units: 'whole', ingredient: 'bananas'}, {qty: 1.5, units: 'cups', ingredient: 'flour'}],
         'added':'05/29/2014',
         'title':'Banana Bread',
         'time':1,
         'instructions':'Mash bananas. Add flour. Bake.'},
        {'id':'2',
         'tags':['mexican','snack'],
         'ingredients':[{qty: 3, units: 'whole', ingredient: 'avacados'}, {qty: 1, units: 'whole', ingredient: 'limes'}],
         'added':'04/13/2014',
         'title':'Guacamole',
         'time':0,
         'instructions':'Mash avacado, add lime. Serve.'} 
      ];
    // $http.get('recipes/recipes.json').success(function(data) {
    //   $scope.recipes = data;
    // });

    $scope.orderProp = 'name';
  }]);

recipeManagerControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    
    $scope.recipeId = $routeParams.recipeId;

    var recipes = [
        {'id':'1',
         'tags':['dessert','fruit'],
         'ingredients':[{qty: 4, units: 'whole', ingredient: 'bananas'}, {qty: 1.5, units: 'cups', ingredient: 'flour'}],
         'added':'05/29/2014',
         'title':'Banana Bread',
         'time':1,
         'instructions':'Mash bananas. Add flour. Bake.'},
        {'id':'2',
         'tags':['mexican','snack'],
         'ingredients':[{qty: 3, units: 'whole', ingredient: 'avacados'}, {qty: 1, units: 'whole', ingredient: 'limes'}],
         'added':'04/13/2014',
         'title':'Guacamole',
         'time':0,
         'instructions':'Mash avacado, add lime. Serve.'} 
      ];

     $scope.recipe = recipes[$scope.recipeId-1];
  }]);

