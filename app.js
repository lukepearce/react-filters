// Craft creates the data
// Craft routes make data available
// Data is sent as json if request is AJAX
// If not it renders the page using craft entries
// Or render the page using craft entries like normal?
// Then AJAX request it all as JSON?
// No,that would mean doing things twice
// If this all happens server side it's all fine - 
// go to a route, 
// craft matches the template which is processed server side... 
// Need to find a way to make craft use and process a js file instead of twig/php... 
// Or dont use craft for routing? Just use it to create the data? Then I can use backbone to set up routing and request data accordingly.. This can all be done server side... boom!
// JS file makes request for data

// Not necessarily. You can make requests to a node server which simply renders a react component with the provided data. 
// It'd just act as a rendering engine, but all of the database access and business logic stays in your PHP based CMS.

var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');

// Uses the # in url
Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('app'));
});

//Uses pushState
// Router.run( routes, Router.HistoryLocation, function ( Handler ) {
//   React.render( <Handler/>, document.getElementById('app') );
// });