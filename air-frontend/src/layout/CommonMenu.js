import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Const, Server } from 'components/Properties';
import { Menu } from 'antd';
import {
  FormOutlined,
  CalendarOutlined,
  DeploymentUnitOutlined,
  BlockOutlined,
  SolutionOutlined,
  FileOutlined,
} from '@ant-design/icons';
import qs from 'qs';

import MenuUtil from './MenuUtil';
import { SessionUtil } from 'utils';
import { inject, observer } from 'mobx-react';

import './Layout.module.css';

@inject((stores) => ({ mainStore: stores.MainStore }))
@observer
class CommonMenu extends React.Component {
  constructor(props) {
    super(props);
    const { mainStore } = props;
    const { groupId, userLevel } = mainStore.getUser();
    this.state = {
      collapsed: false,
      target: '',
      openKeys: [],
      selectedKeys: [],
      groupId: groupId,
      userLevel: userLevel,
    };
  }

  UNSAFE_componentWillMount() {
    const query = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    const selectedKey = MenuUtil.fnMenuSelectedKey();
    const openKey = MenuUtil.fnMenuOpenKey();
    this.setState({
      selectedKeys: [selectedKey],
      openKeys: [openKey],
    });
  }

  okPermission = (menuId) => {
    const { groupId, userLevel } = this.state;

    // ---------------------------------------------------------------
    // Download는 예외적 BROILER & (PPL, FARM) 만 다운로드 가능합니다.
    // ---------------------------------------------------------------
    if (menuId === 'Download') {
      if (groupId === Const.BROILER) {
        if (userLevel === Const.FARM || userLevel === Const.PPL) return true;
      }
      return false;
    }

    if (groupId === Const.ADMIN || groupId === Const.DEVEL) return true;
    if (groupId === Const.CONSULT) return false;
    switch (menuId) {
      // case 'Standard':
      //   if (
      //     groupId === Const.BREED ||
      //     groupId === Const.HATCHERY ||
      //     groupId === Const.BROILER
      //   ) {
      //     if (
      //       userLevel === Const.FARM ||
      //       (groupId === Const.BROILER && userLevel === Const.PPL)
      //     )
      //       return true;
      //   }
      //   return false;
      case 'Standard.Breed':
        if (groupId === Const.BREED) {
          if (userLevel === Const.FARM) return true;
        }
        return false;

      case 'Standard.Broiler':
        if (groupId === Const.BROILER) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;

      case 'Work Schedule':
        if (groupId === Const.BREED || groupId === Const.BROILER) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;
      case 'Materials.Info':
        if (
          groupId === Const.BREED ||
          groupId === Const.HATCHERY ||
          groupId === Const.BROILER
        ) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;
      case 'Materials.In/Out':
        if (
          groupId === Const.BREED ||
          groupId === Const.HATCHERY ||
          groupId === Const.BROILER
        ) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;
      case 'Basic Info.Farm':
        if (groupId === Const.BREED || groupId === Const.BROILER) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;
      case 'Basic Info.Customer':
        if (
          groupId === Const.BREED ||
          groupId === Const.HATCHERY ||
          groupId === Const.BROILER
        ) {
          if (
            userLevel === Const.FARM ||
            (groupId === Const.BROILER && userLevel === Const.PPL)
          )
            return true;
        }
        return false;
      case 'Basic Info.Breeding HH':
        if (groupId === Const.BREED) {
          if (userLevel === Const.FARM) return true;
        }
        return false;
      case 'Basic Info.Hatchery':
        if (groupId === Const.HATCHERY) {
          if (userLevel === Const.FARM) return true;
        }
        return false;
      case 'Basic Info.Setter':
        if (groupId === Const.HATCHERY) {
          if (userLevel === Const.FARM) return true;
        }
        return false;
      case 'Basic Info.Hatcher':
        if (groupId === Const.HATCHERY) {
          if (userLevel === Const.FARM) return true;
        }
        return false;
      case 'Basic Info.Project':
        if (groupId === Const.BROILER) {
          if (userLevel === Const.FARM || userLevel === Const.PPL) return true;
        }
        return false;
      case 'Basic Info.Flock':
        if (groupId === Const.BREED) {
          if (userLevel === Const.FARM) return true;
        }
        return false;
      case 'Member':
        return false;
      case 'System.Code':
        return false;
      case 'System.Lang':
        return false;
      case 'System.Group':
        return false;
    }
    return false;
  };

  render() {
    if (this.props.menu !== Const.MENU_COMMON) return null;
    const { location } = this.props;
    const possible = { system: false };
    if (this.state.groupId === 'DEVEL') possible.system = true;
    return (
      <Menu
        onClick={(e) => MenuUtil.fnMenuClick(e, this.state, this.props)}
        theme="dark"
        // style={{ width: 256 }}
        defaultSelectedKeys={this.state.selectedKeys}
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        {this.okPermission('Standard') && (
          // <Menu.Item key="/common/standard/score">
          //   <Icon type="form" />
          //   <span>
          //     <Trans>Standard</Trans>
          //   </span>
          // </Menu.Item>
          <Menu.SubMenu
            key="_std"
            title={
              <span>
                <FormOutlined />
                <span>
                  <Trans>Standard</Trans>
                </span>
              </span>
            }
          >
            {this.okPermission('Standard.Breed') && (
              <Menu.Item key="/common/standard/breed">
                <span>
                  <Trans>Breed</Trans>
                </span>
              </Menu.Item>
            )}
            {this.okPermission('Standard.Broiler') && (
              <Menu.Item key="/common/standard/broiler">
                <span>
                  <Trans>Broiler</Trans>
                </span>
              </Menu.Item>
            )}
          </Menu.SubMenu>
        )}

        {this.okPermission('Work Schedule') && (
          <Menu.Item key="/common/work/schedule">
            <CalendarOutlined />
            <span>
              <Trans>Work Schedule</Trans>
            </span>
          </Menu.Item>
        )}

        {(this.state.groupId === Const.ADMIN ||
          this.state.groupId === Const.DEVEL ||
          ((this.state.groupId === Const.BREED ||
            this.state.groupId === Const.HATCHERY ||
            this.state.groupId === Const.BROILER) &&
            this.state.userLevel === Const.FARM)) && (
          <Menu.SubMenu
            key="_mat"
            title={
              <span>
                <DeploymentUnitOutlined />
                <span>
                  <Trans>Materials</Trans>
                </span>
              </span>
            }
          >
            {this.okPermission('Materials.Info') && (
              <Menu.Item key="/common/materials/info">
                <span>
                  <Trans>Info</Trans>
                </span>
              </Menu.Item>
            )}
            {this.okPermission('Materials.In/Out') && (
              <Menu.Item key="/common/materials/io">
                <span>
                  <Trans>In/Out</Trans>
                </span>
              </Menu.Item>
            )}
          </Menu.SubMenu>
        )}

        {(this.state.groupId === Const.ADMIN ||
          this.state.groupId === Const.DEVEL ||
          ((this.state.groupId === Const.BREED ||
            this.state.groupId === Const.HATCHERY ||
            this.state.groupId === Const.BROILER) &&
            this.state.userLevel === Const.FARM)) && (
          <Menu.SubMenu
            key="_basic"
            title={
              <span>
                <BlockOutlined />
                <span>
                  <Trans>Basic Info</Trans>
                </span>
              </span>
            }
          >
            {this.okPermission('Basic Info.Farm') && (
              <Menu.Item key="/common/basic/farminfo">
                <span>
                  <Trans>Farm</Trans>
                </span>
              </Menu.Item>
            )}

            {this.okPermission('Basic Info.Customer') && (
              <Menu.Item key="/common/basic/customerinfo">
                <span>
                  <Trans>Customer</Trans>
                </span>
              </Menu.Item>
            )}
            {/*
            플라즈마, 프로젝트는 별도 구분하지 않습니다.
          <Menu.Item key="/common/basic/plazma">
            <span>
              <Trans>Plazma</Trans>
            </span>
          </Menu.Item>
          <Menu.Item key="/common/basic/project">
            <span>
              <Trans>Project</Trans>
            </span>
          </Menu.Item>
          */}

            {this.okPermission('Basic Info.Breeding HH') && (
              <Menu.Item key="/common/basic/breeding_hh">
                <span>
                  <Trans>Breeding HH</Trans>
                </span>
              </Menu.Item>
            )}

            {this.okPermission('Basic Info.Hatchery') && (
              <Menu.Item key="/common/basic/hatcheryinfo">
                <span>
                  <Trans>Hatchery</Trans>
                </span>
              </Menu.Item>
            )}

            {this.okPermission('Basic Info.Setter') && (
              <Menu.Item key="/common/basic/setterinfo">
                <span>
                  <Trans>Setter</Trans>
                </span>
              </Menu.Item>
            )}

            {this.okPermission('Basic Info.Hatcher') && (
              <Menu.Item key="/common/basic/hatcherinfo">
                <span>
                  <Trans>Hatcher</Trans>
                </span>
              </Menu.Item>
            )}
            {/* 육계계사정보는 육계메뉴로 이동조치함
            2020.02.12 by 장태학 요청사항
            ==> 2020.03.09 by 김기철 요청사항으로 이동
            ==> 2020.03.24 by 장태학 TC_BROILER_HH_INFO 테이블 삭제 처리됨.
          <Menu.Item key="/common/basic/broiler_hh">
            <span>
              <Trans>Broiler HH</Trans>
            </span>
          </Menu.Item>
          */}

            {this.okPermission('Basic Info.Project') && (
              <Menu.Item key="/common/basic/projectinfo">
                <span>
                  <Trans>Project</Trans>
                </span>
              </Menu.Item>
            )}

            {this.okPermission('Basic Info.Flock') && (
              <Menu.Item key="/common/basic/flockinfo">
                <span>
                  <Trans>Flock</Trans>
                </span>
              </Menu.Item>
            )}
          </Menu.SubMenu>
        )}

        {this.okPermission('Member') && (
          <Menu.SubMenu
            key="_user"
            title={
              <span>
                <SolutionOutlined />
                <span>
                  <Trans>User</Trans>
                </span>
              </span>
            }
          >
            <Menu.Item key="/common/member/userinfo">
              <Trans>Info</Trans>
            </Menu.Item>
            <Menu.Item key="/common/member/useraccess">
              <Trans>Access</Trans>
            </Menu.Item>
          </Menu.SubMenu>
        )}

        {/*
        <SubMenu
          key="_user"
          title={
            <span>
              <SolutionOutlined />
              <span>
                <Trans>Member</Trans>
              </span>
            </span>
          }
        >
          <Menu.Item key="/common/member/userinfo">
            <Trans>User</Trans>
          </Menu.Item>
          <Menu.Item key="/common/menu/menu">
            <Trans>Menu</Trans>
          </Menu.Item>
        </SubMenu>
        */}

        {possible.system && (
          <Menu.SubMenu
            key="_sys"
            title={
              <span>
                <FileOutlined />
                <span>
                  <Trans>System</Trans>
                </span>
              </span>
            }
          >
            <Menu.Item key="/common/system/codeinfo">
              <Trans>Code</Trans>
            </Menu.Item>
            <Menu.Item key="/common/system/langinfo">
              <Trans>Lang</Trans>
            </Menu.Item>
            <Menu.Item key="/common/group/groupinfo">
              <Trans>Group</Trans>
            </Menu.Item>
          </Menu.SubMenu>
        )}

        {/* this.okPermission('Download') && (
          <Menu.Item key="/common/download/app">
            <AppstoreOutlined />
            <span>
              <Trans>Download</Trans>
            </span>
          </Menu.Item>
        ) */}
      </Menu>
    );
  }
}
export default withRouter(CommonMenu);
