/**
 * 缓存操作对象 sessionStorage
 */
const sessionCache = {
  /**
   * 设置缓存
   * @param key 
   * @param value 
   * @returns 
   */
  set(key: string, value: string) {
    if (!sessionStorage) {
      return;
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value);
    }
  },
  /**
   * 获取缓存
   * @param key 
   * @returns 
   */
  get(key: string) {
    if (!sessionStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return sessionStorage.getItem(key);
  },
/**
 * 设置缓存数据
 * @param key 
 * @param jsonValue 
 */
  setJSON(key: string, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  /**
   * 获取缓存数据
   * @param key 
   * @returns 
   */
  getJSON<T>(key: string) {
    const value = this.get(key);
    if (value) {
      return JSON.parse(value) as T;
    } else {
      return null;
    }
  },
  /**
   * 删除缓存
   * @param key 
   */
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
};

/**
 * 缓存操作对象 localStorage
 */
const localCache = {
  /**
   * 设置缓存
   * @param key 
   * @param value 
   * @returns 
   */
  set(key: string, value: string) {
    if (!localStorage) {
      return;
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value);
    }
  },
  /**
   * 获取缓存
   * @param key 
   * @returns 
   */
  get(key: string) {
    if (!localStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return localStorage.getItem(key);
  },
  /**
   * 设置缓存
   * @param key 
   * @param jsonValue 
   */
  setJSON(key: string, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  /**
   * 获取缓存
   * @param key 
   * @returns 
   */
  getJSON<T>(key: string) {
    const value = this.get(key);
    if (value != null) {
      return JSON.parse(value) as T;
    }
  },
  /**
   * 删除缓存
   * @param key 
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
};

export default {
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
};
