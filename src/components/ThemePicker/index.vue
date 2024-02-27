<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts" setup name="ThemePickerCmpt">
import { computed, ref, watch, onMounted } from "vue";
import settingsStore from "@/stores/settings";
const state = settingsStore();

// const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color
const chalk = ref(""); // content of theme-chalk css
const theme = ref("");
const defaultTheme = computed(() => state.theme);

const emit = defineEmits<{ (event: "change", name: string): void }>();

const setTheme = async (val: string) => {
  const oldVal = chalk.value ? theme.value : ORIGINAL_THEME;
  const themeCluster = getThemeCluster(val.replace("#", ""));
  const originalCluster = getThemeCluster(oldVal.replace("#", ""));

  const getHandler = (variable: string, id: string) => {
    return () => {
      const originalCluster = getThemeCluster(ORIGINAL_THEME.replace("#", ""));
      //TODO this[variable]
      const newStyle = updateStyle(variable, originalCluster, themeCluster);

      let styleTag = document.getElementById(id);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("id", id);
        document.head.appendChild(styleTag);
      }
      styleTag.innerText = newStyle;
    };
  };

  if (!chalk.value) {
    //TODO const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
    const url = `https://unpkg.com/element-ui@1.0.1/lib/theme-chalk/index.css`;
    await getCSSString(url);
  }

  const chalkHandler = getHandler("chalk", "chalk-style");

  chalkHandler();

  const styles = [].slice.call(document.querySelectorAll("style")).filter((style: HTMLStyleElement) => {
    const text = style.innerText;
    return new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text);
  });
  styles.forEach((style: HTMLStyleElement) => {
    const { innerText } = style;
    if (typeof innerText !== "string") return;
    style.innerText = updateStyle(innerText, originalCluster, themeCluster);
  });
  emit("change", val);
};

const updateStyle = (style: string, oldCluster: string[], newCluster: string[]) => {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
  });
  return newStyle;
};

const getCSSString = (url: string) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        //TODO this[variable]
        // variable = xhr.responseText.replace(/@font-face{[^}]+}/, "");
        resolve("");
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
};

const getThemeCluster = (theme: string) => {
  const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(",");
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));

      red = Number(red.toString(16));
      green = Number(green.toString(16));
      blue = Number(blue.toString(16));

      return `#${red}${green}${blue}`;
    }
  };

  const shadeColor = (color: string, shade: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    red = Number(red.toString(16));
    green = Number(green.toString(16));
    blue = Number(blue.toString(16));

    return `#${red}${green}${blue}`;
  };

  const clusters: string[] = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};

watch(
  defaultTheme,
  (val) => {
    theme.value = val;
  },
  {
    immediate: true,
  }
);

watch(theme, (val) => {
  setTheme(val);
});
onMounted(() => {
  if (defaultTheme.value !== ORIGINAL_THEME) {
    setTheme(defaultTheme.value);
  }
});
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
