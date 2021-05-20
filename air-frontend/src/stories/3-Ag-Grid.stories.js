import React from 'react';

import {
  AgGridReact,
  AllModules,
  isRowSelected
} from 'components/commons/ag-grid/AgGridUtil';
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-balham.css';

export default {
  title: 'Ag Grid Simple'
};

class AgGridSimple extends React.Component {
  state = {
    columnDefs: [
      { headerName: '메이커', field: 'make' },
      { headerName: '모델', field: 'model' },
      { headerName: '가격', field: 'price' }
    ],
    rowData: [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]
  };

  render() {
    return (
      <div
        style={{ height: '200px', width: '100%' }}
        className="ag-theme-balham"
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}

export const ag_grid_simple = () => <AgGridSimple />;
