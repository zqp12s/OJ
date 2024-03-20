import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  }),
  getters: {
    // 按钮权限列表
    authButtonListGet: state => state.authButtonList
  },
  actions: {
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }
});
