<template>
  <div class="el-icon-picker_con">
    <el-popover v-model:visible="showPopv" :width="440" placement="bottom-start">
      <template #reference>
        <el-button :icon="modelValue" class="icon_picker_btn" @click="showPopover">{{ modelValue || "请选择图标" }}</el-button>
      </template>
      <div class="el-icon-picker">
        <el-input v-model="filterVal" class="filter_input" placeholder="输入图标查询" :suffix-icon="Search" @input="inputFilter" />
        <div class="icon_con">
          <component :is="icon" v-for="icon in iconList" :key="icon" class="icon" :class="{ icon, 'icon-active': icon == modelValue }" @click="chooseIcon(icon)"></component>
        </div>
      </div>
    </el-popover>
    <el-icon v-if="modelValue" class="delete_icon" size="16" title="清除" @click="clearPicker">
      <Close />
    </el-icon>
  </div>
</template>

<script lang="ts" setup name="ComElIconPicker">
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import * as ELIcons from "@element-plus/icons-vue";
// 获取所有elment Icon name
const icons: string[] = [];
for (const [key] of Object.entries(ELIcons)) {
  icons.push(key);
}

withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);

const iconList = ref<string[]>([]);
const filterVal = ref("");
const showPopv = ref(false);

const emit = defineEmits<{ (event: "update:modelValue", value: string): void }>();

const showPopover = () => {
  filterVal.value = "";
  showPopv.value = true;
};

const chooseIcon = (icon: string) => {
  emit("update:modelValue", icon);
  showPopv.value = false;
};

// 图标过滤查询
const inputFilter = (val?: string) => {
  if (val) {
    iconList.value = icons.filter((item) => item.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  } else {
    iconList.value = [];
    iconList.value = iconList.value.concat(icons);
  }
};

// 清除选中
const clearPicker = () => {
  emit("update:modelValue", "");
};

watch(
  () => showPopv.value,
  (newVal) => {
    if (newVal) {
      filterVal.value = "";
      inputFilter();
    }
  }
);
</script>

<style scoped lang="less">
.el-icon-picker {
  height: 256px;
  //   display: flex;
  //   justify-content: space-around;
  //   flex-wrap: wrap;

  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    // color: $dark_gray;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    margin: 10px;
  }

  .icon:hover {
    color: var(--el-color-primary);
  }

  .icon-active {
    color: var(--el-color-primary);
  }

  .icon_picker_btn {
    float: left;
  }

  .filter_input {
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    margin-bottom: 3px;
  }

  .icon_con {
    height: calc(100% - 39px);
    overflow-y: auto;
  }
}

.el-icon-picker_con {
  .delete_icon {
    float: right;
    margin-left: 8px;
    height: 32px;
    cursor: pointer;
    visibility: hidden;
  }

  .delete_icon:hover {
    color: red;
  }
}

.el-icon-picker_con:hover {
  .delete_icon {
    visibility: visible;
  }
}
</style>
