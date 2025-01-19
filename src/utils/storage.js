class Storage {
  static setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default Storage;
