import React from 'react';
import AppearanceResultsTable from './AppearanceResultsTable';

var FilterableTileTable = React.createClass({
  render: function() {
    return (
      <div>
        <AppearanceResultsTable appearances={this.props.appearances} />
      </div>
    );
  }
});

module.exports = FilterableTileTable;
