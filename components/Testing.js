// FilterableTileTable
// 	FilterSelectionTable
// 		FilterSelectionGroup
// 			FilterInput
// 	AppearanceResultsTable
// 		Appearance
// 			AppearanceSampleOrderTable
// 				OrderSampleInput
// 	SelectedFilterBar
// 		SelectedFilterInput

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
			<ul>
				{sampleOptions}
			</ul>
		);
	}
});

var Appearance = React.createClass({
	render: function() {
		return (
			<div className="a3-12">
        <img src={this.props.appearance.image} alt={this.props.appearance.title} />
				{this.props.appearance.title}<br />
				{this.props.appearance.range}<br />
				{this.props.appearance.material}<br />

				<AppearanceSampleOrderTable sampleOptions={this.props.appearance.finishes} />
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
      this.props.onFilterSelect(
        this.refs.filterOption.getDOMNode().value,
        this.refs.filterOption.getDOMNode().checked
      );
    },
    render: function() {
        // var name = this.props.filter.stocked ?
        //     this.props.filter.name :
        //     <span style={{color: 'red'}}>
        //         {this.props.filter.name}
        //     </span>;
        return (
        	<div>
          	<input type="checkbox" ref="filterOption" name="input" value={this.props.filter} onChange={this.handleChange} checked={this.props.isSelected}>{this.props.filter}</input>
          </div>
        );
    }
});


var FilterSelectionGroup = React.createClass({
    render: function() {
        return (
        	<div>{this.props.group}</div>
        );
    }
});

var FilterSelectionTable = React.createClass({
    render: function() {
        var filterSelectionGroup = [];
        var lastGroup = null;
        this.props.filters.forEach(function(filter, index) {
            if (filter.group !== lastGroup) {
                filterSelectionGroup.push(<FilterSelectionGroup group={filter.group} key={filter.group} />);
            }
            filterSelectionGroup.push(<FilterInput onFilterSelect={this.props.onFilterSelect} filter={filter.name} key={filter.name} />);
            lastGroup = filter.group;
        }.bind(this));
        return (
            <div>
                {filterSelectionGroup}
            </div>
        );
    }
});

var SelectedFilterInput = React.createClass({
    render: function() {
        return (
            <li><input type="checkbox">{this.props.filter}</input></li>
        );
    }
});

var SelectedFilterBar = React.createClass({
    render: function() {
    		// var filterList = [];
    		// this.props.selectedFilters.forEach( function( filter, index ) {
    		// 	filterList.push( <SelectedFilterInput filter={filter} /> );
    		// });
        return (
            <ul>
            	{this.props.selectedFilters}
            </ul>
        );
    }
});

var FilterableTileTable = React.createClass({
		getInitialState: function() {
        return {
            selectedFilters: [],
            appearances: this.props.appearances
        };
    },

    onFilterSelect: function( selectedFilters ) {
    	var newList = this.state.selectedFilters;
    	newList.push( selectedFilters );
      this.setState({ selectedFilters: newList });

      // var filterObject = {};
      // var filterSelectionGroup = [];
      // var lastGroup = null;
      // this.props.filters.forEach(function(filter, index) {
      //     if (filter.group !== lastGroup) {
      //         filterSelectionGroup.push( filter.group );
      //     }
      //     filterSelectionGroup.push( filter.name );
      //     lastGroup = filter.group;
      // }.bind(this));

      var filters = this.state.selectedFilters;
      
			var filteredItems = this.runFilter( this.state.appearances, {
				
			  $and: [ 
			    { $or: { material:  { $in: filters } } },
			    //{ $or: { year:  { $in:[ "2006", "1990" ] } } },
			    //{ $or: { end:  { $in:[ 2010 ] } } }
			  ]
			});

  		this.setState({ appearances: filteredItems });
    },

    runFilter: function( array, filters ) { 
    	console.log( "runnning filter with: " + filters );
    	return _.query( array, filters );
		},

    render: function() {
        return (
            <div>
                <SelectedFilterBar selectedFilters={this.state.selectedFilters} />
                <FilterSelectionTable onFilterSelect={this.onFilterSelect} filters={this.props.filters} />
                <AppearanceResultsTable appearances={this.state.appearances} />
            </div>
        );
    }
});


var APPEARANCES = [
  {title: 'White', range: 'Italian Stone', material: 'Porcelain', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/white.jpg'},
  {title: 'Ivory', range: 'Mud', material: 'Porcelain', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/ivory.jpg'},
  {title: 'Beige', range: 'Italian Stone', material: 'Stone', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/beige.jpg'},
  {title: 'Dark Grey', range: 'Driftwood', material: 'Porcelain', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/dark-grey.jpg'},
  {title: 'Grey', range: 'Drift Wood', material: 'Stone', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/grey.jpg'},
  {title: 'Light Grey', range: 'Italian Stone', material: 'Porcelain', finishes: ['Matt', 'Polished', 'Bush Hammered'], image: '/assets/img/appearances/light-grey.jpg'}
];

var FILTERS = [
  {group: 'Material', name: 'Stone'},
  {group: 'Material', name: 'Porcelain'},
  {group: 'Material', name: 'Ceramic'},
  {group: 'Look', name: 'Matt'},
  {group: 'Look', name: 'Polished'},
  {group: 'Look', name: 'Bush Hammered'}
];

var FilterWrapper = React.createClass({

	render: function() {
		return (
			<FilterableTileTable appearances={APPEARANCES} filters={FILTERS} />
		);
	}

});

module.exports = FilterWrapper;
 
//React.render(<FilterableTileTable appearances={APPEARANCES} filters={FILTERS} />, document.body);