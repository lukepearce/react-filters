import React from 'react';
import FilterSelectionGroup from './FilterSelectionGroup';
import FilterInput from '../filters/FilterInput';
import some from 'lodash/collection/some';

var FilterSelectionTable = React.createClass({
  render: function() {
    var filterSelectionGroup = [];
    var lastGroup = null;
    this.props.filters.forEach( ( filter, index ) => {
    	// Filter input always starts life as unchecked
      var isChecked = false;

      // if the filter is in selected filters then its rendered as checked
      if ( some( this.props.selectedFilters, filter ) ) { 
        isChecked = true;
      }

      if (filter.name !== lastGroup) {
        filterSelectionGroup.push( <FilterSelectionGroup group={filter.name} key={filter.name} /> );
      }
      filterSelectionGroup.push( <FilterInput onFilterChange={this.props.onFilterChange} filter={filter} key={index} isChecked={isChecked} /> );
      lastGroup = filter.name;
    });
    return (
      <div className="filter-selection-table">
        {filterSelectionGroup}
      </div>
    );
  }
});

module.exports = FilterSelectionTable;