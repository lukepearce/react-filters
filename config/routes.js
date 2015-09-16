var React = require('react');
var Main = require('../components/main');
var Home = require('../components/home/Home');
var TileWrapper = require('../components/tile-search/TileWrapper');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="tile-search" path="tile-search" handler={TileWrapper} />
    <DefaultRoute handler={Home} />
  </Route>
);