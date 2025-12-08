import { fileURLToPath, URL } from "node:url";
import createVitePlugins from "./vite/plugins";
import serveConfig from "./vite/vite.config.serve";
import buildConfig from "./vite/vite.config.build";
import { defineConfig, loadEnv } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  const config = command === "build" ? buildConfig : serveConfig;
  return {
    plugins: createVitePlugins(VITE_APP_ENV, command === "build"),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@vue-office/pptx": path.resolve(__dirname, "node_modules/@vue-office/pptx/lib/v3/vue-office-pptx.mjs"),
        "@vue-office/docx": path.resolve(__dirname, "node_modules/@vue-office/docx/lib/v3/vue-office-docx.mjs"),
        "@vue-office/excel": path.resolve(__dirname, "node_modules/@vue-office/excel/lib/v3/vue-office-excel.mjs"),
        "@vue-office/pdf": path.resolve(__dirname, "node_modules/@vue-office/pdf/lib/v3/vue-office-pdf.mjs"),
      },
    },
    ...config,
  };
});
