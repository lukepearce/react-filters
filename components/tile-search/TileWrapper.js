import React from 'react';
import TileSearch from './TileSearch';

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

var TileWrapper = React.createClass({

  render: function() {
    return (
      <TileSearch appearances={APPEARANCES} filters={FILTERS} />
    );
  }

});

module.exports = TileWrapper;