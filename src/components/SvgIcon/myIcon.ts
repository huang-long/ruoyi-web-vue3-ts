import { defineComponent, h } from "vue";
import svgIcon from "./index.vue";

// 声明以 "my" 开头的字符串类型
// type SvgIconPath = `${string}/assets/icons/svg/${string}.svg`;
const modules = import.meta.glob("./../../assets/icons/svg/*.svg", { as: "url" });

/**
 *  icons文件名数组
 */
const filenNmes = [];
for (const path in modules) {
  const result = path.match(/^(.*)(assets\/icons\/svg\/)(\w+)(\.svg)$/);
  if (result && result[3]) {
    filenNmes.push(result[3]);
  }
}

/**
 *  icons组件名称数组 (my + Filename)
 */
export const myIconNames = filenNmes.map((name) => "my" + name.replace(/^./, (L) => L.toUpperCase()));

/**
 *  icons组件数组
 */
const myIcons = filenNmes.map((name) => {
  return {
    name: "my" + name.replace(/^./, (L) => L.toUpperCase()),
    component: defineComponent({
      render() {
        return h(svgIcon, { iconClass: name });
      },
    }),
  };
});

export default myIcons;
