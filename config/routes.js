var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home/Home');
var Testing = require('../components/Testing');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="testing" path="testing" handler={Testing} />
    <DefaultRoute handler={Home} />
  </Route>
);