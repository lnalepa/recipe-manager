var recipeManagerControllers = angular.module('recipeManagerControllers', []);

recipeManagerControllers.controller('RecipesCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/recipe').success(function(data) {
    $scope.recipes = data;
  });

  function deleteRecipe(id) {
    $http.delete('/api/recipe/'+id).success(function(data) {
    });
    $http.get('/api/recipe').success(function(data) {
      $scope.recipes = data;
    });
  }

  $scope.deleteRecipe = deleteRecipe; 

  $scope.orderProp = 'title';
}]);


recipeManagerControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    
  // if ($routeParams.recipeId === 'new') {
  //   $routeParams.recipeId = '';
  // }


  $scope.recipeId = $routeParams.recipeId;
  $scope.units = ['mL', 'pinch', 'whole', 'cup', 'pound', 'can', 'package'];

  if ($scope.recipeId !== 'new') {
    $http.get('/api/recipe/'+ $scope.recipeId).success(function(data) {
      $scope.recipe = data;
    });
  } else {
     var placeholder = {};
     placeholder["tags"] = [];
     placeholder["ingredients"] = [{}];
     placeholder["ingredients"][0].qty = '';
     placeholder["ingredients"][0].units = '';
     placeholder["ingredients"][0].ingredient = '';
     placeholder["added"] = '';
     placeholder["title"] = '';
     placeholder["time"] = '';
     placeholder["instructions"] = '';

     $scope.recipe = placeholder;
  }

  $scope.deleteIngredient = function(index){
    delete $scope.recipe.ingredients[index];
  }

  $scope.addIngredient = function (){
    var newIngredient = {};
    newIngredient.qty = '';
    newIngredient.units = '';
    newIngredient.ingredient = '';
    $scope.recipe.ingredients.push(newIngredient);
  }

  
  function save() {
    var id;
    // if ($("#recipeId").val() === 'new') {
    //   id = ''; 
    // } else {
      id = $("#recipeId").val();
    // }
    // var recipeData = JSON.stringify($('form').serializeArray());
    var recipeData = {};
    recipeData["title"] = $("#title").val();
    var tags = [];
    $(".tags").each(function() {
      var tag = $(this).html();
      tags.push(tag);   
    });
    recipeData["tags"] = tags;
    recipeData["added"] = $("#added").val();
    recipeData["time"] = $("#time").val();
    recipeData["instructions"] = $("#instructions").val();

    var ingredients = [];
    $(".ingredients").each(function() {
      var ingredient = {};
      ingredient["qty"] = $(this).children(".qty").val();
      ingredient["units"] = $(this).children(".units").val();
      ingredient["ingredient"] = $(this).children(".ingredient").val();
      ingredients.push(ingredient);   
    });

    recipeData["ingredients"] = ingredients;

    if (id === 'new') {
      $http.post('/api/recipe', recipeData).success(function(data) {
        $scope.recipe = data;
        $("#recipeId").val($scope.recipe._id);
        id = $("#recipeId").val();
      });
      setTimeout(function(){ 
        $http.get('/api/recipe/'+ id).success(function(data) {
          $scope.recipe = data;
        });
      }, 1000);

      
    } else {
      $http.put('/api/recipe/'+ id, recipeData).success(function(data) {
        $scope.recipe = data;
      });
      $http.get('/api/recipe/'+ id).success(function(data) {
        $scope.recipe = data;
      });
    }

  } 

  $scope.save = save;
 
}]);

