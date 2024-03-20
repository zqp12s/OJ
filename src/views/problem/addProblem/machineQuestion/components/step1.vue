<template>
  <div class="card content-box" style="border: none; box-shadow: none">
    <el-form ref="step1FormRules" :model="form" label-width="auto" style="width: 100%" :rules="rules" :inline="true">
      <el-form-item label="题目标题" prop="title" style="width: 100%">
        <el-input v-model="form.title" placeholder="请输入内容..." />
      </el-form-item>
      <el-form-item label="题目描述" prop="description" style="width: 100%">
        <WangEditor v-model:value="form.description" height="300px" />
      </el-form-item>
      <el-form-item label="输入描述" prop="inputDescription" style="width: 100%">
        <WangEditor v-model:value="form.inputDescription" height="300px" />
      </el-form-item>
      <el-form-item label="输出描述" prop="outputDescription" style="width: 100%">
        <WangEditor v-model:value="form.outputDescription" height="300px" />
      </el-form-item>
      <el-form-item label="提示" prop="hint" style="width: 100%">
        <WangEditor v-model:value="form.hint" height="300px" />
      </el-form-item>
      <el-form-item label="难度" prop="level" style="width: 40%">
        <el-radio-group v-model="form.level" size="large">
          <el-radio-button label="入门" value="Beginner" />
          <el-radio-button label="简单" value="Simple" />
          <el-radio-button label="中等" value="Medium" />
          <el-radio-button label="较难" value="Difficult" />
          <el-radio-button label="困难" value="Hard" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题目是否可见" prop="visible" style="width: 20%">
        <el-switch v-model="form.visible" />
      </el-form-item>
      <el-form-item label="题目标签" prop="tags" style="width: 30%">
        <el-select v-model="form.tags" multiple collapse-tags placeholder="Select" style="width: 240px">
          <el-option v-for="item in Tags" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间(ms)" prop="timeLimit" style="width: 30%">
        <el-input type="number" v-model="form.timeLimit" />
      </el-form-item>
      <el-form-item label="内存(MB)" prop="memoryLimit" style="width: 30%">
        <el-input type="number" v-model="form.memoryLimit" />
      </el-form-item>
      <el-form-item label="来源" prop="source" style="width: 30%">
        <el-input v-model="form.source" placeholder="请输入内容..." />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref, reactive, watchEffect, onMounted } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { useProblemStore } from "@/stores/modules/problem";

const problemStore = useProblemStore();
const step1FormRules = ref<FormInstance>();
const Tags = ref([
  {
    value: "111",
    label: "hhh"
  },
  {
    value: "222",
    label: "www"
  }
]);
const form = ref({
  title: "",
  inputDescription: "",
  description: "",
  outputDescription: "",
  hint: "",
  level: "",
  source: "",
  tags: [],
  visible: false,
  timeLimit: 1000,
  memoryLimit: 128
});
const rules = reactive<FormRules>({
  title: [{ required: true, message: "请输入题目" }],
  description: [{ required: true, message: "请输入题目描述" }],
  inputDescription: [{ required: true, message: "请输入输入描述" }],
  outputDescription: [{ required: true, message: "请输入输出描述" }],
  hint: [{ required: false, message: "请输入提示" }],
  level: [{ required: true, message: "请选择难度" }],
  visible: [{ required: true, message: "请选择是否可见" }],
  timeLimit: [{ required: true, message: "请填写" }],
  memoryLimit: [{ required: true, message: "请填写" }],
  source: [{ required: true, message: "请填写" }],
  tags: [{ required: false, message: "请选择" }]
});
watchEffect(() => {
  form.value = problemStore.getStep1Data;
});
onMounted(() => {
  problemStore.changeStep1Status(false);
});
defineExpose({
  form,
  step1FormRules
});
</script>

<style scoped lang="scss">
@import "./step1";
</style>
