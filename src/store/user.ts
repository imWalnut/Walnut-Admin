import type { IUserItems } from "@/types/instance/user";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref<IUserItems>();

    const setUserInfo = (val: IUserItems) => {
      userInfo.value = val;
    };

    // token
    const token = ref<string>('');

    const setToken = (val: string) => {
      token.value = val;
    };

    return {
      userInfo,
      setUserInfo,
      token,
      setToken,
    };
  },
  { persist: { enabled: true } }
);

export default useUserStore;
