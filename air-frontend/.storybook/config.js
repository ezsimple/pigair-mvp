import { configure } from '@storybook/react';
import { LicenseManager } from '@ag-grid-enterprise/core';

// automatically import all files ending in *.stories.js
LicenseManager.setLicenseKey(
  'Evaluation_License_Not_For_Production_2_March_2020__MTU4MzEwNzIwMDAwMA==12d7491114e302b6213098155f3e87e2'
);
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
