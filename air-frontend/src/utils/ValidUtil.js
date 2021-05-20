export default class ValidUtil {
  static isEmail = str => {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
  };

  static isEmpty = str => {
    var pattern = /\S+/;
    return !pattern.test(str);
  };

  static isNumber = str => {
    var pattern = /^\d+$/;
    return pattern.test(str);
  };

  static isEqual = (str1, str2) => {
    return str1 === str2;
  };
}
