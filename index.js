var Hapi = require('hapi');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

// Create a server with a host and port
// var server = new Hapi.Server();
var server = new Hapi.Server({ debug: { request: ['error'] } });
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

//SETTING UP SCHEMAS, MODELS, METHODS
var Schema = mongoose.Schema;
var allowableUnits = ['mL', 'pinch', 'whole', 'cup', 'pound', 'can', 'package'];
var recipeSchema = new Schema({
  tags: [],
  ingredients: [{qty: Number, units: {type: String, enum: allowableUnits}, ingredient: String}],
  added: { type: Date, default: Date.now },
  title:  {type: String, required: true},
  time: {type: Number, required: true},
  instructions: {type: String, required: true}
});

var Recipes = mongoose.model('Recipes', recipeSchema);

function seedData(cb) {
	Recipes.remove({}, function(removeErr) {
		if (removeErr) return console.log("could not clear db: " + removeErr)
		Recipes.create(require('./recipes.json'), cb)
	});
}

//ROUTING
server.route({
    method: 'GET',
    path: '/debug/seed', //this method is for debugging only
    handler: function (request, reply) {
    	seedData(function (err, records) {
    		if (err) return reply('error seeding: ' + err)
    		else return reply(records)
    	});
		}
});

server.route({
	method: 'GET',
	path: '/api/recipe/{id?}',
	handler: function (request, reply) {
		if(request.params.id) {
	  	Recipes.findById(request.params.id, function(err, recipe){
	  		if (err) return reply('error: ' + err)
	  		else return reply(recipe)
	  	})
		} else {
			var query = request.query || {};
			if (query.title) query.title = new RegExp(query.title, 'i');
			if (query.ingredients) {
				ingredients = query.ingredients.split(',');
				query['$and'] = query['$and'] || [];
				for (thisIngredient in ingredients) {
					query['$and'].push({'ingredients.ingredient' : new RegExp(ingredients[thisIngredient], 'i')})
				}
				delete query.ingredients;
			}
			if (query.tags) {
				tags = query.tags.split(',');
				query['$and'] = query['$and'] || [];
				for (thistag in tags) {
					query['$and'].push({'tags' : tags[thistag].toLowerCase()})
				}
				delete query.tags;
			}
			if (query.time) query.time = {'$lte' : query.time};
			Recipes.find(query, function(err, recipe){
			if (err) return reply('error searching: ' + err)
			else return reply(recipe)
			})
		}
	}
});

server.route({
    method: 'PUT',
    path: '/api/recipe/{id}',
    handler: function (request, reply) {
    	Recipes.findByIdAndUpdate(request.params.id, request.payload, function(err, recipe){
    		if (err) return reply('error updating: ' + err)
    		else return reply(recipe)
    	})
		}
});

server.route({
    method: 'POST',
    path: '/api/recipe',
    handler: function (request, reply) {
    	console.log(request.payload);
    	Recipes.create(request.payload, function(err, recipe){
    		if (err) return reply('error creating: ' + err)
    		else return reply(recipe)
    	})
		}
});

server.route({
    method: 'DELETE',
    path: '/api/recipe/{id}',
    handler: function (request, reply) {
    	Recipes.findByIdAndRemove(request.params.id, function(err, recipe){
    		if (err) return reply('error deleting: ' + err)
    		else return reply(recipe)
    	})
		}
});

server.route({
    method: 'GET',
    path: '/components/{param*}',
    handler: {
        directory: {
            path: 'bower_components'
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'app',
            index: 'index.html'
        }
    }
});



// Start the server
server.start();