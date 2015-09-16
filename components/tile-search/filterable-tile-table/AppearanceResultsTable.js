import React from 'react';
import Appearance from '../../appearance/Appearance';

var AppearanceResultsTable = React.createClass({
  render: function() {
    var appearances = this.props.appearances.map( function( appearance, index ){
      return (
        <Appearance appearance={appearance} key={index} />
      )
    });
    return (
      <div className="row">
        {appearances}
      </div>
    );
  }
});

module.exports = AppearanceResultsTable;