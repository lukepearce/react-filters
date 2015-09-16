import React from 'react';
import AppearanceOrderSampleTable from './AppearanceOrderSampleTable';

var Appearance = React.createClass({
  render: function() {
    return (
      <div className="desk-3-12">
        <div className="m-b">
          <img className="m-b" src={this.props.appearance.image} alt={this.props.appearance.title} />
          <h3 className="h h2"><a className="a" href="#">{this.props.appearance.title}</a></h3>
          <div className="h h3"><a className="a" href="#">{this.props.appearance.range}</a> - <a className="a" href="#">{this.props.appearance.material}</a></div>

          <AppearanceOrderSampleTable sampleOptions={this.props.appearance.finishes} />
        </div>
      </div>
    );
  }
});

module.exports = Appearance;