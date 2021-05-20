import React, { Component } from 'react';

export default class GenderCellRenderer extends Component {
  render() {
    const image = this.props.value === 'Male' ? '수컷' : '암컷';
    return (
      <span>
        {image} {this.props.value}
      </span>
    );
  }
}
