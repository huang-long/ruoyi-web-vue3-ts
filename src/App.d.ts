import { ComponentOptions } from "vue";
import type { Directive } from "vue";
import type { CopyCallbackFun } from "./directive/common/copyText.ts";

declare module "vue" {
  export interface GlobalDirectives {
    /**
     * @type v-hasRole
     * @see ./directive/permission/hasRole.ts
     */
    vHasRole: Directive<HTMLElement, string[]>;

    /**
     * @type v-hasRole
     * @see ./directive/permission/hasRole.ts
     */
    vHasPermi: Directive<HTMLElement, string[]>;

    /**
     * @type v-copyText
     * @see ./directive/common/copyText.ts
     */
    vCopyText: Directive<HTMLElement, string | CopyCallbackFun, string, "callback">;
  }

  const componentOptions: ComponentOptions;
  export default componentOptions;
}
