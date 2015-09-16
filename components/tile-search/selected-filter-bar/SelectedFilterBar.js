import React from 'react';
import FilterInput from '../filters/FilterInput';

var SelectedFilterBar = React.createClass({
  render: function() {
    var filterList = [];
    this.props.selectedFilters.forEach( ( filter, index ) => {
      filterList.push( <li key={index} className="i-b m-r"><FilterInput onFilterChange={this.props.onFilterChange} filter={filter} isChecked={true}/></li> );
    });

    var clearAllButton = this.props.selectedFilters.length === 0 ? null :
          <button className="btn" onClick={this.props.resetFilters}>Clear All</button>;

    return (
      <div>
        <ul className="selected-filters">
          {filterList}
        </ul>

        <div className="clear-all">{clearAllButton}</div>
      </div>
    );
  }
});

module.exports = SelectedFilterBar;