<template>
  <div>
    <el-checkbox v-model="simpleCheck">是否需要测试用例 </el-checkbox>
    <div v-if="simpleCheck" style=" display: flex; flex-direction: row; justify-content: flex-end;margin-right: auto 1vh">
      <el-space>
        <div>
          题目测试案例(必选zip文件)
          <el-tooltip content="查看案例上传格式" placement="top">
            <el-button circle size="small" @click="dialogVisible = true">?</el-button>
          </el-tooltip>
        </div>
        <el-upload
          ref="upload"
          show-file-list
          accept="application/zip"
          :action="apiUrl + '/tool/upload-testcase'"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="(response, file, fileList) => uploadComplied(response, file, fileList)"
          :on-error="response => uploadFailed(response)"
          style="margin-top: 5%"
        >
          <el-button type="primary">Click to upload</el-button>
        </el-upload>
      </el-space>
    </div>
    <div v-if="simpleCheck">
      <el-card
        v-for="(item, index) in form.samples"
        :key="'samplesidid' + index"
        class="custom-card"
        style=" position: relative;max-width: 200vh; height: 225px; margin-top: 1vh"
      >
        <template #header>
          <div style="position: absolute; top: 5px; font-size: 18px">
            <b>样例Sample{{ index + 1 }}</b>
          </div>
          <el-button type="danger" @click="delSamples(index)" style="position: absolute; top: 4px; right: 10px">
            删除样例
          </el-button>
        </template>
        <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: -1.5vh">
          <div style="display: flex; flex-direction: column">
            Input Samples:
            <el-input
              v-model="form.samples[index].input"
              style="width: 80vh; margin-top: 1vh"
              :rows="6"
              type="textarea"
              placeholder="Please input"
              required
            />
          </div>
          <div style="display: flex; flex-direction: column">
            Output Samples:
            <el-input
              v-model="form.samples[index].output"
              style="width: 80vh; margin-top: 1vh"
              :rows="6"
              type="textarea"
              placeholder="Please input"
              required
            />
          </div>
        </div>
      </el-card>
      <el-button style="width: 100%; margin-top: 1vh" plain @click="addSamples()">添加样例</el-button>
    </div>
    <p>特判题（Special Judge）：</p>
    <el-checkbox v-model="form.spj">是否特判（Use Special Judge）</el-checkbox>
    <div v-if="form.spj">
      <div style="display: flex; flex-direction: row">
        <p style="min-width: 50vh">Special Judge Code</p>
        <div style=" display: flex; align-items: center; justify-content: flex-end;width: 100%">
          SPJ language:
          <el-radio-group v-model="form.spjLanguage" style="margin-left: 1.5vh">
            <el-radio value="C">C</el-radio>
            <el-radio value="C++">C++</el-radio>
            <el-radio value="Java">Java</el-radio>
            <el-radio value="Python2">Python2</el-radio>
            <el-radio value="Python3">Python3</el-radio>
          </el-radio-group>
        </div>
      </div>
      <WangEditor v-model:value="form.spjCode" height="300px" />
    </div>
    <el-dialog v-model="dialogVisible" title="上传规则" width="500">
      <p>1.输入文件拓展名为in</p>
      <p>2.输出文件拓展名为out</p>
      <p>3.保证一个in文件对应一个out文件</p>
      <p>4.将全部文件打包为Zip文件进行上传</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { ElNotification } from "element-plus";
import { genFileId } from "element-plus";
import { useProblemStore } from "@/stores/modules/problem";
import WangEditor from "@/components/WangEditor/index.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const problemStore = useProblemStore();

const simpleCheck = ref(true);
const dialogVisible = ref(false);
const form = ref({
  spj: false,
  spjCode: "",
  spjLanguage: "",
  samples: [{ input: "", output: "" }],
  testCaseHash: "",
  testCaseScores: []
});

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const uploadComplied = (response, file, fileList) => {
  console.log(response);
  ElNotification({
    title: "Success",
    message: "文件上传成功",
    type: "success"
  });
};
const uploadFailed = response => {
  console.log(response);
  ElNotification({
    title: "Error",
    message: "文件上传失败",
    type: "error"
  });
};
const addSamples = () => {
  form.value.samples.push({ input: "", output: "" });
};
const delSamples = index => {
  form.value.samples.splice(index, 1);
};
onMounted(() => {});
watchEffect(() => {
  form.value = problemStore.getStep2Data;
});
defineExpose({
  form
});
</script>
<style lang="scss">
.custom-card .el-card__body {
  background: rgb(242 244 244);
}
.custom-card .el-card__header {
  background: rgb(255 255 255);
}
</style>
