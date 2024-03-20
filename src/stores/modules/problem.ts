import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useProblemStore = defineStore({
  id: "problem",
  state: () => ({
    step1Data: {
      title: "",
      inputDescription: "",
      description: "",
      outputDescription: "",
      hint: "",
      level: "",
      source: "",
      tagIds: [] as string[],
      visible: false,
      timeLimit: 1000,
      memoryLimit: 128
    },
    step2Data: {
      spj: false,
      spjCode: "",
      spjLanguage: "",
      samples: [{ input: "", output: "" }],
      testCaseHash: "",
      testCaseScores: [
        {
          score: 0.0,
          inputName: "1.in",
          outputName: "2.in"
        }
      ]
    },
    pageNumber: 0,
    Step1Satus: false,
    Step2Satus: false,
    step3Data: {}
  }),
  getters: {
    getPageNumber: state => state.pageNumber,
    getStep1Data: state => state.step1Data,
    getStep2Data: state => state.step2Data,
    getStep1Satus: state => state.Step1Satus,
    getStep2Satus: state => state.Step2Satus
  },
  actions: {
    // Set Token
    // setToken(token: string) {
    //   this.token = token;
    // },
    resetStore() {
      this.$reset();
    },
    saveStep1(params) {
      this.step1Data = { ...params };
    },
    saveStep2(params) {
      this.step2Data = { ...params };
    },
    savePageNumber(number) {
      this.pageNumber = number;
    },
    changeStep1Status(status) {
      this.Step1Satus = status;
    },
    changeStep2Status(status) {
      this.Step2Satus = status;
    }
  },
  persist: piniaPersistConfig("problem")
});
