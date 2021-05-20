import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AllModules } from 'ag-grid-enterprise';
import PagingUtil from '../../src/utils/PagingUtil';

class AgGridPaging extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Athlete',
          field: 'athlete',
          minWidth: 170,
          checkboxSelection: function (params) {
            return params.columnApi.getRowGroupColumns().length === 0;
          },
          headerCheckboxSelection: function (params) {
            return params.columnApi.getRowGroupColumns().length === 0;
          },
        },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      autoGroupColumnDef: {
        headerName: 'Group',
        minWidth: 170,
        field: 'athlete',
        valueGetter: function (params) {
          if (params.node.group) {
            return params.node.key;
          } else {
            return params.data[params.colDef.field];
          }
        },
        headerCheckboxSelection: true,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: { checkbox: true },
      },
      defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      rowSelection: 'multiple',
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      paginationPageSize: 10,
      paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
      },
      pagination: false,
      rowData: [],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridApi.paginationSetPageSize(Number(10));
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();

    const updateData = (data) => {
      this.setState({ rowData: data });
      params.api.paginationGoToPage(0);
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  draw = (params) => {
    return (
      <div className="ag-paging-panel ag-unselectable">
        <span ref="eSummaryPanel" className="ag-paging-row-summary-panel">
          <span ref="lbFirstRowOnPage">1</span>
          to
          <span ref="lbLastRowOnPage">10</span>
          of
          <span ref="lbRecordCount">100</span>
        </span>
        <span className="ag-paging-page-summary-panel">
          <div ref="btFirst" className="ag-paging-button ag-disabled">
            <span className="ag-icon ag-icon-first" unselectable="on" />
            <button type="button">First</button>
          </div>
          <div ref="btPrevious" className="ag-paging-button ag-disabled">
            <span className="ag-icon ag-icon-previous" unselectable="on" />
            <button type="button">Previous</button>
          </div>
          Page <span ref="lbCurrent">1</span> of <span ref="lbTotal">10</span>
          <div ref="btNext" className="ag-paging-button">
            <span className="ag-icon ag-icon-next" unselectable="on" />
            <button type="button">Next</button>
          </div>
          <div ref="btLast" class="ag-paging-button">
            <span className="ag-icon ag-icon-last" unselectable="on" />
            <button type="button">Last</button>
          </div>
        </span>
      </div>
    );
  };

  render() {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '500px',
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={AllModules}
            columnDefs={this.state.columnDefs}
            // autoGroupColumnDef={this.state.autoGroupColumnDef}
            // defaultColDef={this.state.defaultColDef}
            suppressRowClickSelection={true}
            // groupSelectsChildren={true}
            debug={true}
            // rowSelection={this.state.rowSelection}
            // rowGroupPanelShow={this.state.rowGroupPanelShow}
            // pivotPanelShow={this.state.pivotPanelShow}
            // enableRangeSelection={true}
            pagination={false}
            // paginationPageSize={this.state.paginationPageSize}
            // paginationNumberFormatter={this.state.paginationNumberFormatter}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
          {/* this.draw ({}) */}
          <PagingUtil />
        </div>
      </div>
    );
  }
}

export const AgGrid페이징 = () => <AgGridPaging />;

export default {
  title: 'AgGrid 페이징',
};
