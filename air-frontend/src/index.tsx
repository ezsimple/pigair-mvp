import 'react-app-polyfill/ie9'; // For IE9-10 Support
import 'react-app-polyfill/ie11'; // For IE11 Support
import 'react-app-polyfill/stable';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { LicenseManager as LicenseModuleManager } from '@ag-grid-enterprise/core';
import { LicenseManager } from 'ag-grid-enterprise';

import Root from './Root';
import 'i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons/css/tachyons.min.css';
import 'antd/dist/antd.css';
// import './index.css';

axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const licenseKey =
  'CompanyName=ezfarm,LicensedGroup=ezfarm_LEE,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-007912,ExpiryDate=28_April_2021_[v2]_MTYxOTU2NDQwMDAwMA==014c20ffa01926a32d384e6d8998af73';
LicenseManager.setLicenseKey(licenseKey);
LicenseModuleManager.setLicenseKey(licenseKey);
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
