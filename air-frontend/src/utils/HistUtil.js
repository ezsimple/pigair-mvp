export default class HistUtil {
  // 뒤로가기 주소를 임의로 지정합니다.
  static setGoBackURI = backURI => {
    window.history.pushState(
      { name: 'browserBack' },
      'on browser back click',
      backURI
    );
  };
}
