import React from 'react';
import { withRouter } from 'react-router-dom';

// const HistoryBack = ({ history }) => (
//   <a href="#" onClick={history.goBack}>
//     <i class="mdi mdi-chevron-left"></i>
//   </a>
// )

const HistoryBack = props => (
  <a href="#" onClick={props.history.goBack}>
    {props.children}
  </a>
);

export default withRouter(HistoryBack);
