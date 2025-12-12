import hasRole from "./permission/hasRole";
import hasPermi from "./permission/hasPermi";
import copyText from "./common/copyText";
import type { App } from "vue";

/**
 * vue Directive入口
 */
const myDirective = {
  version: "1.0.0",
  install: (app: App) => {
    app.directive("hasRole", hasRole);
    app.directive("hasPermi", hasPermi);
    app.directive("copyText", copyText);
  },
};

export default myDirective;
