export default class ListUtil {
  static hasKey = (key, arr) => {
    if (!key) return false;
    if (!Array.isArray(arr)) return false;
    return JSON.stringify(arr).indexOf(key) > -1;
  };
}
