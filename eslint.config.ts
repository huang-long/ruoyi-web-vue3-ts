import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules/**", "dist/**", "cypress/**", "vite/**", "*.config.js"]),
  //eslint默认常规配置
  eslint.configs.recommended,
  //tseslint默认常规配置
  ...tseslint.configs.recommended,
  //Vue默认常规配置
  ...pluginVue.configs["flat/essential"],
  //tseslint自定义配置
  {
    files: ["src/**/*.{ts,vue}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser, //ts官方解析器
        ecmaVersion: "latest",
        project: "./tsconfig.app.json", // 指定 tsconfig.json 路径
        sourceType: "module",
        extraFileExtensions: [".ts", ".vue"], //需要明确指定额外的文件扩展名
      },
    },
    // 可以为 Vue 文件添加特定规则
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "vue/multi-word-component-names": "off", // 关闭名称校验
      "vue/html-closing-bracket-newline": "off", // html 不换行
      //逗号规则 https://zh-hans.eslint.org/docs/latest/rules/comma-dangle#rule-details
      "comma-dangle": [
        "error",
        {
          arrays: "never",
          objects: "never",
          imports: "never",
          exports: "never",
          functions: "never",
        },
      ],
    },
  },
  //prettier默认常规配置
  eslintPluginPrettierRecommended,
]);
