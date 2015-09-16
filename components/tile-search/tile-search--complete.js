// FilterableTileTable
//  FilterSelectionTable
//    FilterSelectionGroup
//      FilterInput
//  AppearanceResultsTable
//    Appearance
//      AppearanceSampleOrderTable
//        OrderSampleInput
//  SelectedFilterBar
//    SelectedFilterInput

//-- all of the pieces of data. are they state?
// ask three questions
// 1. Is it passed in from a parent via props? If so, it probably isn't state.
// 2. Does it change over time? If not, it probably isn't state.
// 3. Can you compute it based on any other state or props in your component? If so, it's not state.

// The selected filter inputs - changes over time
// The original appearance items - props not state
// The filtered appearance items - not state as its made from the selected filters
// The selected samples - changes over time

// pass selected filters as an array to FilterableTileTable
// handleFilterChange {
//
//}

// pass selected samples to App - this needs to

var React = require('react');
var _ = require('lodash');
require('underscore-query')(_);

var OrderSampleInput = React.createClass({
  render: function() {
    return (
      <li>{this.props.sampleOption}</li>
    );
  }
});


var AppearanceSampleOrderTable = React.createClass({
  render: function() {
    var sampleOptions = this.props.sampleOptions.map( function( option, index ){
      return (
        <OrderSampleInput sampleOption={option} key={index} />
      )
    });
    return (
      <div>
        <p className="i">Order sample:</p>
        <ul>
          {sampleOptions}
        </ul>
      </div>
    );
  }
});

var Appearance = React.createClass({
  render: function() {
    return (
      <div className="desk-3-12">
        <div className="m-b">
          <img className="m-b" src={this.props.appearance.image} alt={this.props.appearance.title} />
          <h3 className="h h2"><a className="a" href="#">{this.props.appearance.title}</a></h3>
          <div className="h h3"><a className="a" href="#">{this.props.appearance.range}</a> - <a className="a" href="#">{this.props.appearance.material}</a></div>

          <AppearanceSampleOrderTable sampleOptions={this.props.appearance.finishes} />
        </div>
      </div>
    );
  }
});

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

var FilterInput = React.createClass({
  handleChange: function() {
    // build the selected filter object
    var selectedFilter = {};
    selectedFilter.name = this.refs.filterOption.getDOMNode().name;
    selectedFilter.value = this.refs.filterOption.getDOMNode().value;

    // pass the selected filter object to the onFilterChange function in app component
    this.props.onFilterChange( selectedFilter );
  },
  render: function() {
    return (
      <div>
        <label value={this.props.filter.value}>
          <input className="filter-list__checkbox" type="checkbox" ref="filterOption" name={this.props.filter.name} value={this.props.filter.value} onChange={this.handleChange} checked={this.props.isChecked} />
          <div className="filter-list__item">
            {this.props.filter.value}
          </div>
        </label>
      </div>
    );
  }
});


var FilterSelectionGroup = React.createClass({
  render: function() {
    var groupName = _.capitalize( this.props.group );
    return (
      <div className="h">{groupName}</div>
    );
  }
});

var FilterSelectionTable = React.createClass({
    render: function() {
        var filterSelectionGroup = [];
        var lastGroup = null;
        this.props.filters.forEach( ( filter, index ) => {
          // if filter is in selectedFilters send checked props as true
          // else it's unchecked?

          var isChecked = false;

          if ( _.some( this.props.selectedFilters, filter ) ) { 
            isChecked = true;
          }

          if (filter.name !== lastGroup) {
            filterSelectionGroup.push( <FilterSelectionGroup group={filter.name} key={filter.name} /> );
          }
          filterSelectionGroup.push( <FilterInput onFilterChange={this.props.onFilterChange} filter={filter} key={index} isChecked={isChecked} /> );
          lastGroup = filter.name;
        });
        return (
          <div className="island">
            {filterSelectionGroup}
          </div>
        );
    }
});

// var SelectedFilterInput = React.createClass({
//     render: function() {
//         return (
//             <li className="i-b m-r"><input type="checkbox" defaultChecked onChange={this.props.onFilterChange} >{this.props.filter}</input></li>
//         );
//     }
// });

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

var FilterableTileTable = React.createClass({
  render: function() {
    return (
      <div>
        <AppearanceResultsTable appearances={this.props.appearances} />
      </div>
    );
  }
});


var APPEARANCES = [
  {title: 'White', range: 'Italian Stone', material: ['Porcelain'], finishes: ['Matt', 'Polished', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60W.jpg'},
  {title: 'Ivory', range: 'Mud', material: ['Porcelain'], finishes: ['Matt', 'Polished', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60A.jpg'},
  {title: 'Beige', range: 'Italian Stone', material: ['Stone'], finishes: ['Matt', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60B.jpg'},
  {title: 'Dark Grey', range: 'Driftwood', material: ['Porcelain'], finishes: ['Matt', 'Polished', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60DG.jpg'},
  {title: 'Grey', range: 'Drift Wood', material: ['Stone'], finishes: ['Matt', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60G.jpg'},
  {title: 'Light Grey', range: 'Italian Stone', material: ['Porcelain'], finishes: ['Polished', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60GH.jpg'},
  {title: 'Light Grey', range: 'Italian Stone', material: ['Ceramic'], finishes: ['Polished', 'Bush Hammered'], image: 'assets/img/appearances/M2-0-60GH.jpg'}
];

var FILTERS = [
  {name: 'material', value: 'Stone'},
  {name: 'material', value: 'Porcelain'},
  {name: 'material', value: 'Ceramic'},
  {name: 'finishes', value: 'Matt'},
  {name: 'finishes', value: 'Polished'},
  {name: 'finishes', value: 'Bush Hammered'}
];

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

var TileWrapper = React.createClass({

  render: function() {
    return (
      <TileSearch appearances={APPEARANCES} filters={FILTERS} />
    );
  }

});

module.exports = TileWrapper;
 
//React.render(<FilterableTileTable appearances={APPEARANCES} filters={FILTERS} />, document.body);