import React from 'react';

import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import produce from 'immer';
import { inject, observer } from 'mobx-react';

// import { CommonMenu } from 'layout';
import { SessionUtil } from 'utils';
import LangCode from 'containers/pages/common/system/LangCode';
// import PplFarmProjectCode from 'containers/pages/common/system/PplFarmProjectCode';

// import logo1 from '../images/logo_em.png';
// import logo2 from '../images/logo_text.png';
// import cj_logo1 from '../images/cj/logo_em_cj.png';

import './Layout.module.css';
import { Env, Const } from 'components/Properties';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

@inject((stores) => ({ mainStore: stores.MainStore }))
@observer
class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    const { mainStore } = props;
    this.state = {
      collapsed: false,
      menu: undefined, // breeding(종계), broiler(육계), hatchery(부화)
      userInfo: {
        groupId: SessionUtil.getGroupId(),
        userId: SessionUtil.getUserId(),
        farmCode: SessionUtil.getFarmCode(),
        hatcheryId: SessionUtil.getHatcheryId(),
        isPpl: SessionUtil.isPpl(),
        dateFormat: SessionUtil.getDateFormat(),
      },
      params: {
        lang: SessionUtil.getLang(),
        countryCode: SessionUtil.getCountryCode(),
      },
    };
    this.pathname = window.location.pathname;
    this.isBreeding = this.pathname.indexOf('/breeding/') > -1;
    this.isBroiler = this.pathname.indexOf('/broiler/') > -1;
    this.isHatchery = this.pathname.indexOf('/hatchery/') > -1;
    this.isCommon = this.pathname.indexOf('/common/') > -1;
  }

  setCollapsePosition = () => {
    document.querySelector('div.ant-layout-sider-trigger').style.position =
      'relative';
  };

  componentDidMount() {
    if (this.isBreeding) {
      this.setState({ menu: Const.MENU_BREED, typeName: i18n.t('종계') });
    }
    if (this.isHatchery) {
      this.setState({ menu: Const.MENU_HATCHERY, typeName: i18n.t('부화') });
    }
    if (this.isBroiler) {
      this.setState({ menu: Const.MENU_BROILER, typeName: i18n.t('육계') });
    }
    if (this.isCommon) {
      this.setState({ menu: Const.MENU_COMMON, typeName: i18n.t('공통') });
    }
    this.setCollapsePosition();
  }

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  // 대메뉴 항목 변경 메소드
  onTypeChange = (e) => {
    const that = this;
    const menu = e.target.value || 'breeding';

    // 대메뉴 변경시 첫페이지 자동 이동 기능 추가
    this.setState({ menu: menu }, function () {
      const FIRST_PAGE = that.getFirstPage(menu);
      console.log(FIRST_PAGE);
      that.props.history.push(FIRST_PAGE);
    });
  };

  setCode = (name, value) => {
    this.setState(
      produce((draft) => {
        draft.params[name] = value;
      }),
      function () {
        console.log(this.state.params);
      }
    );
  };

  onFarmCodeChange = (farmCode) => {
    this.setState(
      produce((draft) => {
        draft.userInfo[farmCode] = farmCode;
      })
    );
  };

  getUserInfo = () => {
    const userNm = SessionUtil.getUserNm();
    const userId = SessionUtil.getUserId();
    const groupId = SessionUtil.getGroupId();
    const userLevelNm = SessionUtil.getUserLevelNm();
    let farmCode = SessionUtil.getFarmCode();
    let hatcheryId = SessionUtil.getHatcheryId();
    const farmNm = SessionUtil.getFarmNm();
    const farmInfo =
      farmCode !== 'undefined' ? farmCode + '(' + farmNm + ')' : 'None';
    const userInfo = userNm + '(' + userId + ') ';
    const isPpl = SessionUtil.isPpl() === true ? 'PPL' : 'No PPL';
    const dateFormat = SessionUtil.getDateFormat();

    // if (groupId !== Const.DEVEL) return userId + '(' + userNm + ')' + ' ';
    // if (groupId === Const.DEVEL)
    if (farmCode === 'undefined') farmCode = 'None';
    if (hatcheryId === 'undefined') hatcheryId = 'None';
    return (
      '[' +
      groupId +
      ',' +
      userLevelNm +
      ',' +
      userId +
      ',' +
      farmCode +
      ',' +
      hatcheryId +
      ',' +
      isPpl +
      '] '
      // + ',' + dateFormat
    );
  };

  render() {
    const { children } = this.props;
    const { menu } = this.state;
    const groupId = SessionUtil.getGroupId();
    let possible = {
      breed: false,
      hatchery: false,
      broiler: false,
      common: false,
    };
    switch (groupId) {
      case 'BREED':
        possible.breed = true;
        possible.common = true;
        break;
      case 'HATCHERY':
        possible.hatchery = true;
        possible.common = true;
        break;
      case 'BROILER':
        possible.broiler = true;
        possible.common = true;
        break;
      case 'CONSULT':
        possible.breed = true;
        possible.hatchery = true;
        possible.broiler = true;
        break;
      case 'DEVEL':
      case 'ADMIN':
        possible.breed = true;
        possible.hatchery = true;
        possible.broiler = true;
        possible.common = true;
        break;
    }

    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ minHeight: '100vh' }}
          width={230}
        >
          <div className="egglogo">
            <img src={Env === 'cjprod' ? cj_logo1 : logo1} />
            <img src={logo2} />
          </div>

          <div className="part_section">
            <select
              id="mainCategory"
              name="mainCategory"
              title=""
              className="partselect"
              onChange={(e) => this.onTypeChange(e)}
              value={menu}
            >
              {possible.breed && (
                <option value="breeding">{i18n.t('Breeding')}</option>
              )}
              {possible.hatchery && (
                <option value="hatchery">{i18n.t('Hatchery')}</option>
              )}
              {possible.broiler && (
                <option value="broiler">{i18n.t('Broiler')}</option>
              )}
              {possible.common && (
                <option value="common">{i18n.t('Common')}</option>
              )}
            </select>
          </div>
          <BroilerMenu {...{ menu, ...this.props }} />
          <CommonMenu {...{ menu, ...this.props }} />
        </Sider>
        <Layout>
          <Header>
            <span>{this.getUserInfo()}</span>
            <PplFarmProjectCode
              style={{ width: 230, marginLeft: 10, marginRight: 10 }}
              onChange={this.onFarmCodeChange}
            ></PplFarmProjectCode>
            <i className="mdi mdi-earth mR10"></i>
            <LangCode
              name="lang"
              className="w-10"
              setCode={this.setCode}
              code={this.state.params.lang}
              changePossible={true}
              disabled={false}
            />{' '}
            <Link to="/logout">
              <i className="mdi mdi-logout"></i>
              <Trans>Log out</Trans>
            </Link>
          </Header>
          <Content>
            {/*
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{this.state.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            */}
            <div>{children}</div>
          </Content>
          <Footer>EggPlan Manager © by EZFARM</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default AppLayout;
