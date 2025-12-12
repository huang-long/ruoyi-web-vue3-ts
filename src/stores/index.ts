import appStore from "./app";
import dictStore from "./dict";
import permissionStore from "./permission";
import tagsViewStore from "./tagsView";
import userStore from "./user";

export { appStore, dictStore, permissionStore, tagsViewStore, userStore };

/**
 * Store 公告入口
 */
export default {
  initStore() {
    return {
      appStore: appStore(),
      dictStore: dictStore(),
      permissionStore: permissionStore(),
      userStore: userStore(),
      tagsViewStore: tagsViewStore(),
    };
  },
};
