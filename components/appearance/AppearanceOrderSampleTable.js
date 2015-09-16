import React from 'react';
import OrderSampleInput from './AppearanceOrderSampleInput';

var AppearanceOrderSampleTable = React.createClass({
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

module.exports = AppearanceOrderSampleTable;