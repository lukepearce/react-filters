import React from 'react';
import capitalize from 'lodash/string/capitalize';

var FilterSelectionGroup = React.createClass({
  render: function() {
    var groupName = capitalize( this.props.group );
    return (
      <div className="h">{groupName}</div>
    );
  }
});

module.exports = FilterSelectionGroup;