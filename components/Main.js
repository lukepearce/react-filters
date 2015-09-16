var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <div className="header">
        	<div className="container">
        		<div className="">
	        		<div className="logo">Logo</div>
	        	</div>
	        		<ul>
	        			<li><a href="/">Home</a></li>
	        			<li><a href="#/tile-search">Tile Search</a></li>
	        			<li><a href="/collections">Collections</a></li>
	        			<li><a href="/showrooms">Showrooms</a></li>
	        			<li><a href="/about">About</a></li>
	        			<li><a href="/contact">Contact</a></li>
	        		</ul>
	        		<div>
	        			Search / Basket
	        		</div>
        	</div>
        </div>

        <div className="container">
        	<RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;