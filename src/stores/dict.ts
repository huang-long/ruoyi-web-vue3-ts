import { defineStore } from "pinia";
import type { DictObj } from "@/api/system/dict/data";

type DictList = {
  key: string;
  value: DictObj[];
};

const store = defineStore("dict", {
  state: () => ({
    dictArr: [] as DictList[],
  }),
  getters: {
    //方法名称参照官网
    //https://pinia.vuejs.org/core-concepts/getters.html#accessing-other-getters
  },
  actions: {
    /**
     * 设置字典
     * @param key
     * @param value
     */
    setDict(key: string, value: DictObj[]) {
      if (key !== null && key !== "") {
        this.dictArr.push({
          key: key,
          value: value,
        });
      }
    },
    /**
     * 获取字典
     * @param key
     * @returns
     */
    getDict(key: string) {
      const dict = this.dictArr.find((item) => item.key == key);
      return dict ? dict.value : undefined;
    },
    /**
     * 删除字典
     * @param key
     */
    removeDict(key: string) {
      this.dictArr = this.dictArr.filter((item) => item.key != key);
    },
    /**
     * 清空字典
     */
    cleanDict() {
      this.dictArr = [] as DictList[];
    },
  },
});

export default store;
