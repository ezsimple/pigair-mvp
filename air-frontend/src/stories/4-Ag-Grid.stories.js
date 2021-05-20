import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from 'ag-grid-enterprise'
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-balham.css';
import GenderCellRenderer from './genderCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [
        {
          field: 'name',
          width: 100
        },
        {
          field: 'gender',
          width: 90,
          cellRenderer: 'genderCellRenderer',
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: ['Male', 'Female'],
            cellRenderer: 'genderCellRenderer'
          }
        },
        {
          field: 'country',
          width: 100,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            cellHeight: 50,
            values: ['Ireland', 'USA']
          }
        },
        {
          field: 'city',
          width: 70,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: function(params) {
            var selectedCountry = params.data.country;
            var allowedCities = countyToCityMap(selectedCountry);
            return {
              values: allowedCities,
              formatValue: function(value) {
                return value + ' (' + selectedCountry + ')';
              }
            };
          }
        },
        {
          field: 'address',
          width: 200,
          cellEditor: 'agLargeTextCellEditor'
        }
      ],
      rowData: [
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Bob Harrison',
          gender: 'Male',
          address:
            '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Mary Wilson',
          gender: 'Female',
          age: 11,
          address:
            '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Sadiq Khan',
          gender: 'Male',
          age: 12,
          address:
            '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
          city: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Jerry Mane',
          gender: 'Male',
          age: 12,
          address:
            '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
          city: 'Dublin',
          country: 'Ireland'
        }
      ],
      frameworkComponents: { genderCellRenderer: GenderCellRenderer },
      defaultColDef: {
        editable: true,
        resizable: true
      }
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  };

  onCellValueChanged(params) {
    var colId = params.column.getId();
    if (colId === 'country') {
      var selectedCountry = params.data.country;
      var selectedCity = params.data.city;
      var allowedCities = countyToCityMap(selectedCountry);
      var cityMismatch = allowedCities.indexOf(selectedCity) < 0;
      if (cityMismatch) {
        params.node.setDataValue('city', null);
      }
    }
  }
  render() {
    return (
      <div style={{ width: '100%', height: '400px' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%'
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            onCellValueChanged={this.onCellValueChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function countyToCityMap(match) {
  var map = {
    Ireland: ['Dublin', 'Cork', 'Galway'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston']
  };
  return map[match];
}

export const 드롭다운_그리드 = () => <GridExample />;
// render(<GridExample></GridExample>, document.querySelector("#root"));

export default {
  title: '드롭다운 그리드'
};
