import React from 'react';
import _ from 'lodash';
require('underscore-query')(_);
import SelectedFilterBar from './selected-filter-bar/SelectedFilterBar';
import FilterSelectionTable from './filter-selection-table/FilterSelectionTable';
import FilterableTileTable from './filterable-tile-table/FilterableTileTable';

var TileSearch = React.createClass({
  getInitialState: function() {
      return {
        selectedFilters: [],
        appearances: this.props.appearances
      };
  },

  componentDidMount: function() {
    var filteredItems = this.handleFilterOfCollection( this.buildQuery( this.state.selectedFilters ) );
    // update the appearances state with the returned value from the query
    this.setState({ appearances: filteredItems });
  },

  buildQuery: function( filters ) {
    var queryObj = {};
    var or_array = [];
    var or_obj = {};
    
    filters.forEach( ( filter, index ) => {
      if( !or_obj.hasOwnProperty( filter.name ) ){
        or_obj[filter.name] = [];
      }
      or_obj[filter.name].push( filter.value );
    });

    for( var key in or_obj ){
      if( !or_obj.hasOwnProperty( key ) ){
        continue;
      }
      var temp_or_obj = {
        '$or': {
          [key]: {
            '$any': or_obj[key]
          }
        }
      };
      or_array.push(temp_or_obj);
    }

    queryObj['$and'] = or_array;
    return queryObj;
  },

  handleFilterOfCollection: function( query ) {
    // use the current filters to query the collection
    return _.query( this.props.appearances, query );
  },

  onFilterChange: function( selectedFilter ) {
    var currentFilters = this.state.selectedFilters;

    if ( _.some( currentFilters, selectedFilter ) ) {
      // if the filter you clicked is already in the selected filters array then remove it
      _.remove( currentFilters, selectedFilter );
    }
    else {
      // if it isn't selected then add it to the selected filters state!
      currentFilters.push( selectedFilter );
    }

    if ( currentFilters.length > 0 ){
      // use the current filters to query the collection
      var query = this.buildQuery( currentFilters );
      var filteredItems = this.handleFilterOfCollection( query );

      // update the appearances state with the returned value from the query
      this.setState({ appearances: filteredItems });

      // update state with the array of filters we pushed/removed from
      this.setState({ selectedFilters: currentFilters });
    }
    else {
      // if there aren't any selected filters then reset appearance state to the default collection
      this.resetFilters();
    }
  },

  resetFilters: function() {
    this.setState({ selectedFilters: [], appearances: this.props.appearances });
  },

  render: function() {
    return (
      <div>
        <div className="wrap">
          <div className="row">
            <div className="desk-3-12">
              <h1 className="h h1">Tile Search</h1>
            </div>
            <div className="desk-9-12">
              <SelectedFilterBar selectedFilters={this.state.selectedFilters} onFilterChange={this.onFilterChange} resetFilters={this.resetFilters}  />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="desk-3-12">
            <FilterSelectionTable onFilterChange={this.onFilterChange} filters={this.props.filters} selectedFilters={this.state.selectedFilters}/>
          </div>
          <div className="desk-9-12">
            <FilterableTileTable appearances={this.state.appearances} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TileSearch;