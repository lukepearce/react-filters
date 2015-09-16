import React from 'react';

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

module.exports = FilterInput;