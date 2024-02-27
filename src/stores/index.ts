import appStore from "./app";
import dictStore from "./dict";
import permissionStore from "./permission";
import settingsStore from "./settings";
import tagsViewStore from "./tagsView";
import userStore from "./user";

export { appStore, dictStore, permissionStore, settingsStore, tagsViewStore, userStore };

export default {
  initStore() {
    return {
      appStore: appStore(),
      dictStore: dictStore(),
      permissionStore: permissionStore(),
      settingsStore: settingsStore(),
      userStore: userStore(),
      tagsViewStore: tagsViewStore(),
    };
  },
};
