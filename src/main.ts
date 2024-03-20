import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "@/assets/styles/index.less";
import myDirective from "@/directive/index"; // directive
import myComponent from "@/components/index"; // component
// svg图标
import "virtual:svg-icons-register";
import myIcons from "@/components/SvgIcon/myIcon";
// formCreate
import formCreate from "@form-create/element-ui";
import fcDesigner from "@form-create/designer";

const app = createApp(App);
app.use(createPinia());
app.use(router);
// element plus Icons
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}
// 自定义icon 转化为 element plus Icons
myIcons.forEach((item) => {
  app.component(item.name, item.component);
});
app.use(ElementPlus);
app.use(myDirective); // 挂载全局指令
app.use(myComponent); // 挂载全局组件
app.use(formCreate);
app.use(fcDesigner);
app.mount("#app");
