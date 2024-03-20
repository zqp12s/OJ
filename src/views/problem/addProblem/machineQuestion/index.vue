<template>
  <el-card style="max-width: 800vh">
    <template #header>
      <el-steps
        class="mb-4"
        style="max-width: 800vh; height: 0.05vh; padding: 0; background: none"
        :space="200"
        :active="active"
        simple
        finish-status="success"
      >
        <el-step title="题干" :icon="Edit" style="padding-left: 20vh" />
        <el-step title="测试用例" :icon="UploadFilled" />
        <el-step title="结果预览" :icon="Picture" style="padding-right: 20vh" />
      </el-steps>
    </template>
    <Step1 ref="step1" v-if="active === 0" />
    <Step2 ref="step2" v-if="active === 1" />
    <Step3 ref="step3" v-if="active === 2" />
    <template #footer>
      <div style="position: relative; width: 100%; height: 2vh">
        <el-space style="position: absolute; right: 3%; margin-top: -1vh">
          <el-button type="primary" :disabled="active === 0" @click="goLast(null)"> 上一步 </el-button>
          <el-button type="primary" :disabled="active === 2" @click="saveData()">保存</el-button>
          <el-button type="primary" :disabled="active === 2" @click="goNext(null)"> 下一步 </el-button>
          <el-button type="primary" v-if="active === 2" @click="Submit()">提交</el-button>
        </el-space>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { Edit, Picture, UploadFilled } from "@element-plus/icons-vue";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useProblemStore } from "@/stores/modules/problem";
import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";
import Step3 from "./components/step3.vue";

const router = useRouter();
const problemStore = useProblemStore();
const active = ref(0);
const isSave = ref([false, false]);
const step1: any = ref(null);
const step2: any = ref(null);

const goLast = (params: any) => {
  if (active.value <= 1) saveData();
  active.value--;
  problemStore.savePageNumber(active.value);
};
const goNext = async (params: any) => {
  switch (active.value) {
    case 0:
      await step1.value?.step1FormRules.validate((valid, fields) => {
        if (valid) {
          saveData();
          active.value++;
        } else {
          console.log("error submit!", fields);
        }
      });
      break;
    case 1:
      saveData();
      active.value++;
  }
  problemStore.savePageNumber(active.value);
};

const saveData = () => {
  try {
    switch (active.value) {
      case 0:
        problemStore.saveStep1(step1.value?.form);
        problemStore.changeStep1Status(true);
        break;
      case 1:
        console.log(step2.value?.form);
        problemStore.saveStep2(step2.value?.form);
        break;
      default:
        // problemStore.saveStep3(step1.value?.form);
        break;
    }
  } catch (error) {
    ElMessage({
      message: "出错误了",
      type: "error"
    });
  } finally {
    ElMessage({
      message: "保存成功",
      type: "success"
    });
  }
};
const Submit = () => {};
watchEffect(() => {
  isSave.value = [problemStore.getStep1Satus, problemStore.getStep2Satus];
});
watchEffect(() => {
  active.value = problemStore.getPageNumber;
});
</script>
