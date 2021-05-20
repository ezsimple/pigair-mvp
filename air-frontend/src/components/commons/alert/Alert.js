import React from 'react';
import { useAlert } from 'react-alert';

const Alert = props => {
  console.log('Alert:', props);
  return <React.Fragment></React.Fragment>;
  // const alert = useAlert();
  // if (props.type === 'error') return alert.error(props.mesg);
  // if (props.type === 'warn') return alert.warn(props.mesg);
  // if (props.type === 'info') return alert.info(props.mesg);
};

export default Alert;
