import React from 'react';

export default class CommonKinds extends React.Comonent {
  sexes = [];
  componentWillMount() {
    this.sexes.push('Male');
    this.sexes.push('Female');
  }

  static getSexes = () => {
    return this.sexes;
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}
