import React from 'react';
import styles from './XButton.module.scss';
// import 'material-icons/css/material-icons.css'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { ArrowBack, Close } from '@material-ui/icons';

const XButton = props => (
  <div className={style.button} onClick={props.onClick}>
    {props.back ? <ArrowBack /> : <Close />}
  </div>
);

export default XButton;
