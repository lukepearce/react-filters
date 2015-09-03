var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Main = React.createClass({
  render: function() {
    return (
      <div>
        on every page

        <RouteHandler />
      </div>
    )
  }
});

module.exports = Main;