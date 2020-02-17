//import the http nodejs module
const http = require('http');

//import export from routes
const routes = require('./routes');

//creates a server
const server = http.createServer(routes.handler);

//launch the server at port 3000 
server.listen(3000);

//server is accessed at localhost:3000