var recipeManagerControllers = angular.module('recipeManagerControllers', []);

recipeManagerControllers.controller('RecipesCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  

  if ($rootScope.tag) {
    $http.get('/api/recipe?tags=' + $rootScope.tag).success(function(data) {
      $scope.recipes = data;
    });
  } else {
    $http.get('/api/recipe').success(function(data) {
      $scope.recipes = data;
    });
  }


  $scope.orderProp = 'title';

  $scope.search = function(query, field){
    if (query && field) {
      $http.get('/api/recipe?' + field + '=' + query).success(function(data) {
        $scope.recipes = data;
      });
    }  else {
      $http.get('/api/recipe').success(function(data) {
        $scope.recipes = data;
      });
    }
    // $scope.orderProp = sort;
  }

  function deleteRecipe(id) {
    $http.delete('/api/recipe/'+id).success(function(data) {
    });
    $http.get('/api/recipe').success(function(data) {
      $scope.recipes = data;
    });
  }

  $scope.deleteRecipe = deleteRecipe; 

  
}]);


recipeManagerControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope', function($scope, $routeParams, $http, $location, $rootScope) {
    
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

  $scope.deleteTag = function(index){
    // delete $scope.recipe.tags[index];
    // tagToDelete = $scope.recipe.tags[index],
    // position = tag_story.indexOf(id_tag);

    if ( ~index ) $scope.recipe.tags.splice(index, 1);
  }

  $scope.addIngredient = function (){
    var newIngredient = {};
    newIngredient.qty = '';
    newIngredient.units = '';
    newIngredient.ingredient = '';
    $scope.recipe.ingredients.push(newIngredient);
  }

  $scope.searchByTag = function (index){
    $location.path('#/recipes');
    $rootScope.tag = $scope.recipe.tags[index];
  }

  $(document).ready(function() {
    $( ".tag-input" ).keypress(function( event ) {
      if ( event.which == 32 ) {
        if ($(this).val() !== '') {
          createTag($(this).val());
        }
      }
    });

    $( ".tag-input").focus(function() {
      $(".tag-panel").addClass('active');
    });
    $( ".tag-input").blur(function() {
      $(".tag-panel").removeClass('active');
    });

  });

  function createTag(tag) {
    $scope.recipe.tags[$scope.recipe.tags.length] = tag;
    $scope.$apply();
    $( ".tag-input" ).val('');
  }

  
  function save() {
    var id;
    id = $("#recipeId").val();

    var recipeData = {};
    recipeData["title"] = $("#title").val();
    var tags = [];
    $(".tags").each(function() {
      var tag = $(this).html();
      tags.push(tag)
    });
    recipeData["tags"] = tags;
    recipeData["added"] = $("#added").val();
    recipeData["time"] = $("#time").val();
    recipeData["instructions"] = $("#instructions").val();

    var ingredients = [];
    $(".ingredients").each(function() {
      var ingredient = {};
      ingredient["qty"] = $(this).children(".qty").val();
      var e = $(this).children(".units")[0];
      ingredient["units"] = e.options[e.selectedIndex].text; 
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
        $rootScope.$apply(function() {
          $location.path('/recipes');
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

