import defaultSettings from "@/settings";
import { defineStore } from "pinia";
type Settings = {
  [keys: string]: string | boolean;
  title: string;
  theme: string;
  sideTheme: string;
  showSettings: boolean;
  topNav: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  dynamicTitle: boolean;
};

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings;
const tempSetting = localStorage.getItem("layout-setting");
const storageSetting = tempSetting ? JSON.parse(tempSetting) : "";

export const store = defineStore({
  id: "settings",
  state: (): Settings => {
    return {
      title: "",
      theme: storageSetting.theme || "#409EFF",
      sideTheme: storageSetting.sideTheme || sideTheme,
      showSettings: showSettings,
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
    };
  },
  getters: {
    //方法名称参照官网
    //https://pinia.vuejs.org/core-concepts/getters.html#accessing-other-getters
  },
  actions: {
    // 修改布局设置
    changeSetting(key: string, value: string | boolean) {
      switch (key) {
        case "title":
          typeof value === "string" && (this.title = value);
          break;
        case "theme":
          typeof value === "string" && (this.theme = value);
          break;
        case "sideTheme":
          typeof value === "string" && (this.sideTheme = value);
          break;
        case "showSettings":
          typeof value === "boolean" && (this.showSettings = value);
          break;
        case "topNav":
          typeof value === "boolean" && (this.topNav = value);
          break;
        case "tagsView":
          typeof value === "boolean" && (this.tagsView = value);
          break;
        case "fixedHeader":
          typeof value === "boolean" && (this.fixedHeader = value);
          break;
        case "sidebarLogo":
          typeof value === "boolean" && (this.sidebarLogo = value);
          break;
        case "dynamicTitle":
          typeof value === "boolean" && (this.dynamicTitle = value);
          break;
      }
    },

    // 设置网页标题
    setTitle(title: string) {
      this.title = title;
    },
  },
});

export default store;
