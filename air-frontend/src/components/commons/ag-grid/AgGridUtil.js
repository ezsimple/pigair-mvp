import { AgGridReact } from 'ag-grid-react';

// for community features
import { AllCommunityModules } from '@ag-grid-community/all-modules';

// for enterprise features
import { AllModules } from '@ag-grid-enterprise/all-modules';

import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-balham.css';
// import 'ag-grid-enterprise/excel-export';
// bootstrap is deprecated ...
// import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-bootstrap.css';

function isRowSelected(params) {
  if (!params || !params.type || !params.node || !params.node.selected)
    return false;
  if (params.type !== 'rowSelected') return false;
  if (params.node.selected === false) return false;
  return true;
}

// console.log(AllModules);

export { AgGridReact, AllModules, isRowSelected };
