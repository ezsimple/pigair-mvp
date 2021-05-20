export default class MenuUtil {
  static isMobile = () => {
    return MenuUtil.fnMenuSelectedKey().indexOf('/mobile/') > -1;
  };

  static fnMenuClick = (e, state, props) => {
    // console.log('click:', e, 'state:', state);
    const location = {
      pathname: e.key,
      state: state, // this.props.location.state.row;
    };
    props.history.push(location);
  };

  static fnMenuSelectedKey = () => {
    const pathname = window.location.pathname.split('/');
    const type = pathname[1];
    const cate = pathname[2];
    const id = pathname[3];
    const selectedKey = '/' + type + '/' + cate + '/' + id;
    // console.log('selectedKey : ', selectedKey);
    return selectedKey;
  };

  static fnMenuOpenKey = () => {
    const selectedKey = this.fnMenuSelectedKey();
    let openKey = '';
    if (selectedKey.indexOf('/standard/') > -1) {
      openKey = '_std';
    }
    if (
      selectedKey.indexOf('/member/') > -1 ||
      selectedKey.indexOf('/roll/') > -1
    ) {
      openKey = '_user';
    }
    if (
      selectedKey.indexOf('/receive/') > -1 ||
      selectedKey.indexOf('/rcvmng/') > -1 ||
      selectedKey.indexOf('/rcvlist/') > -1
    ) {
      openKey = '_rcv';
    }
    if (selectedKey.indexOf('/deliver/') > -1) {
      openKey = '_deli';
    }
    if (selectedKey.indexOf('/cutting/') > -1) {
      openKey = '_cutting';
    }
    if (selectedKey.indexOf('/materials/') > -1) {
      openKey = '_mat';
    }
    if (
      selectedKey.indexOf('/system/') > -1 ||
      selectedKey.indexOf('/group/') > -1
    ) {
      openKey = '_sys';
    }
    if (selectedKey.indexOf('/basic/') > -1) {
      openKey = '_basic';
    }
    if (selectedKey.indexOf('/report/') > -1) {
      openKey = '_rpt';
    }
    if (selectedKey.indexOf('/chickin/') > -1) {
      openKey = '_chick';
    }
    // 메뉴에서는 transfer 는 사라집니다. 2020.02.21
    // if (
    //   selectedKey.indexOf('/transfer/') > -1 ||
    //   selectedKey.indexOf('/transegg/') > -1 ||
    //   selectedKey.indexOf('/transchick/') > -1
    // ) {
    //   openKey = '_trans';
    // }
    if (selectedKey.indexOf('/move/') > -1) {
      openKey = '_move';
    }
    if (selectedKey.indexOf('/hatching/') > -1) {
      openKey='_hatching';
    }
    // console.log('openKey : ', openKey);
    return openKey;
  };
}
