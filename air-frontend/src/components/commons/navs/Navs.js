import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { observer, inject } from 'mobx-react';

import './Navs.module.scss';

class Navs extends Component {
  constructor(props) {
    super(props);
    console.log('Navs:props', this.props);
  }
  render() {
    console.log('Navs : ', this.props);
    const width = '300px';
    return (
      <Fragment>
        <div>
          <Button outline color="warning">
            COMMON (공통)
          </Button>
        </div>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col style={{ width: width }}></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  LOGIN
                </Button>
              </td>
              <td>
                <Link to="/login">LOGIN</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  USER INFO
                </Button>
              </td>
              <td>
                <Link to="/common/member/userinfo">USERINFO</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  GROUP
                </Button>
              </td>
              <td>
                <Link to="/common/group/groupinfo">GROUPINFO</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  STANDARD
                </Button>
              </td>
              <td>
                <Link to="/common/standard/score">SCORE</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  WORK
                </Button>
              </td>
              <td>
                <Link to="/common/work/schedule">SCHEDULE</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  MATERIALS
                </Button>
              </td>
              <td>
                <Link to="/common/materials/info">INFO</Link>
                <Link to="/common/materials/io">IN/OUT</Link>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <br></br>

        <div>
          <Button outline color="warning">
            BREEDING(종계)
          </Button>
        </div>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col style={{ width: width }}></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  RECEIVE
                </Button>
              </td>
              <td>
                <Link to="/breeding/receive/flock">FLOCK</Link>
                <Link to="/breeding/receive/hatchery">HATCHERY</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  GROWING
                </Button>
              </td>
              <td>
                <Link to="/breeding/growing/growlog">LOG</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  EGG
                </Button>
              </td>
              <td>
                <Link to="/breeding/egg/egglog">LOG</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  RELEASE
                </Button>
              </td>
              <td>
                <Link to="/breeding/release/egg">EGG</Link>
                <Link to="/breeding/release/ps">PS</Link>
              </td>
            </tr>
          </tbody>
        </table>

        <br></br>
        <div>
          <Button outline color="warning">
            HATCHERY(부화장)
          </Button>
        </div>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col style={{ width: width }}></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  RECEIVE(입고관리)
                </Button>
              </td>
              <td>
                <Link to="/hatchery/receive/rcvfarm/0">FARM</Link>
                <Link to="/hatchery/receive/rcvpo">PO</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  SETTING
                </Button>
              </td>
              <td>
                <Link to="/hatchery/setting/0">SETTING</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  CANDLING
                </Button>
              </td>
              <td>
                <Link to="/hatchery/candling/candling">CANDLING</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  HATCHING
                </Button>
              </td>
              <td>
                <Link to="/hatchery/hatching/hatcherGPS">HATCHER</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  TRANSFER
                </Button>
              </td>
              <td>
                <Link to="/hatchery/transfer/egg">EGG</Link>
                <Link to="/hatchery/transegg/chick">CHICK</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  CUTTING
                </Button>
              </td>
              <td>
                <Link to="/hatchery/cutting/cutting">CUTTING</Link>
              </td>
            </tr>
          </tbody>
        </table>

        <br></br>
        <div>
          <Button outline color="warning">
            BROILER(육계)
          </Button>
        </div>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col style={{ width: width }}></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  RECEIVE
                </Button>
              </td>
              <td>
                <Link to="/broiler/receive/info">RECEIVE</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  GROWING
                </Button>
              </td>
              <td>
                <Link to="/broiler/growing/info">GROWING</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  TRANSFER
                </Button>
              </td>
              <td>
                <Link to="/broiler/transfer/info">TRANSFER</Link>
              </td>
            </tr>
          </tbody>
        </table>

        <br></br>
        <div>
          <Button outline color="warning">
            MOBILE
          </Button>
        </div>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col style={{ width: width }}></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Button outline color="primary" className="ml2 fl">
                  BROILER
                </Button>
              </td>
              <td>
                <Link to="/mobile/broiler/page/0">PAGE</Link>
                <Link to="/mobile/broiler/popup/0">POPUP</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Navs;
