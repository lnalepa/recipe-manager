var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
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

server.route({
    method: 'GET',
    path: '/components/{param*}',
    handler: {
        directory: {
            path: 'bower_components'
        }
    }
});

// Start the server
server.start();