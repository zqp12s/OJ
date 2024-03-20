import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useWrittenStore = defineStore({
  id: "written",
  state: () => ({
    writtenData: {
      description: "",
      score: 0,
      questions: [
        {
          score: 0,
          description: "",
          allowMultiChoices: false,
          choices: ["", ""],
          correctAnswers: []
        }
      ]
    }
  }),
  getters: {
    getWrittenData: state => state.writtenData
  },
  actions: {
    resetStore() {
      this.$reset();
    },
    saveWrittenData(params) {
      this.writtenData = { ...params };
    }
  },
  persist: piniaPersistConfig("written")
});
