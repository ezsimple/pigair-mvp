import React from 'react';
import { Trans } from 'react-i18next';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { SessionUtil } from 'utils';
import { Modal, Button } from 'antd';

import axios from 'axios';
import qs from 'qs';
import { Server, Const } from 'components/Properties';

export default class DownloadApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      params: { key: Const.APP_DOWNLOAD_KEY },
    };
  }

  componentDidMount() {
    const { params } = this.state;
  }

  render() {
    return (
      <div className="con_box">
        <Trans>This app is made for Broiler, PPL, and Farm users.</Trans>
        <div className="f_right mB30">
          <button
            className="btn_sky"
            onClick={() => {
              location.href =
                Server.getRestAPI() +
                '/dl.do' +
                '?fid=1&jkey=' +
                Const.APP_DOWNLOAD_KEY;
            }}
          >
            <Trans>Download</Trans>
          </button>
        </div>
      </div>
    );
  }
}
