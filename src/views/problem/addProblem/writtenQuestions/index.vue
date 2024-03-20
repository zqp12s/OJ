<template>
  <el-card style="max-width: 200vh; overflow-x: auto">
    <div>
      <p><b>题目描述:</b></p>
      <WangEditor v-model:value="form.description" height="300px" />
    </div>
    <div>
      <div style="display: flex; justify-content: flex-end">
        <el-statistic title="题目总分值" :value="form.score" :precision="1">
          <template #suffix> Score </template>
        </el-statistic>
      </div>
      <el-space direction="vertical">
        <el-card
          v-for="(question, number) in form.questions"
          :key="'question' + number"
          class="custom-card"
          style="position: relative; width: 168.5vh"
        >
          <template #header>
            <div style="position: absolute; top: 5px; font-size: 18px">
              <b>样例Quesion{{ number + 1 }}</b>
            </div>
            <div style="position: absolute; top: 4px; right: 10px">
              <el-space style="font-family: monospace; font-size: 15px">
                问题分值:<el-input-number v-model="form.questions[number].score" :precision="1" @change="scoreChange" />
                题目类型:<el-select
                  v-model="form.questions[number].allowMultiChoices"
                  style="width: 15vh"
                  @change="quetionTypeChange(number)"
                >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button type="danger" @click="delSamples(number)"> 删除样例 </el-button>
              </el-space>
            </div>
          </template>
          <div style="width: 100%">
            <div style="width: 100%">
              <b> 问题描述:</b>
              <el-input
                v-model="form.questions[number].description"
                style="width: 100%; margin-top: 1vh"
                :rows="4"
                type="textarea"
                placeholder="Please input"
              />
            </div>
            <div style="display: flex; flex-direction: column; margin-top: 1vh">
              <div><b>问题选项:</b></div>
              <el-checkbox-group v-model="form.questions[number].correctAnswers">
                <el-radio-group v-model="form.questions[number].correctAnswers">
                  <div
                    v-for="(item, index) in form.questions[number].choices"
                    :key="'choices' + number + index"
                    style="display: flex; flex-direction: row; align-items: center; width: 100%; margin-top: 1vh"
                  >
                    <el-space>
                      <el-checkbox
                        v-if="form.questions[number].allowMultiChoices"
                        :label="'选项 ' + String.fromCharCode(65 + index) + ':'"
                        :value="String.fromCharCode(65 + index)"
                        size="large"
                      />
                      <el-radio v-else :value="String.fromCharCode(65 + index)" size="large">
                        选项 {{ String.fromCharCode(65 + index) }}:
                      </el-radio>
                      <el-input v-model="form.questions[number].choices[index]" style="width: 100vh" placeholder="Please input" />
                      <el-button :icon="Minus" circle @click="delChoices(number, index)" />
                    </el-space>
                  </div>
                </el-radio-group>
              </el-checkbox-group>
              <el-button plain :icon="Plus" style="max-width: 15vh; margin-top: 1vh" @click="addChoies(number)"
                >添加选项</el-button
              >
            </div>
          </div>
        </el-card>
      </el-space>
      <el-button plain :icon="Plus" style="width: 100%; margin-top: 1vh" @click="addSamples()">添加样例</el-button>
    </div>
    <el-divider />
    <div>
      <el-space style="display: flex; justify-content: flex-end">
        <el-button type="primary" @click="saveData()">Save</el-button>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </el-space>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Minus, Plus } from "@element-plus/icons-vue";
import { useWrittenStore } from "@/stores/modules/written";
import { useTabsStore } from "@/stores/modules/tabs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { addWrittenProblems } from "@/api/modules/problem";
import WangEditor from "@/components/WangEditor/index.vue";

const route = useRoute();
const tabStore = useTabsStore();
const writtenStore = useWrittenStore();
const options = [
  { value: false, label: "单选题" },
  { value: true, label: "多选题" }
];
const form = ref({
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
});
const addChoies = number => {
  form.value.questions[number].choices.push("");
};
const delChoices = (number, index) => {
  form.value.questions[number].choices.splice(index, 1);
};
const quetionTypeChange = number => {
  form.value.questions[number].correctAnswers = [];
};
const scoreChange = () => {
  let score = 0.0;
  for (let item of form.value.questions) {
    score += item.score;
  }
  form.value.score = score;
};
const addSamples = () => {
  form.value.questions.push({
    score: 0,
    description: "",
    allowMultiChoices: false,
    choices: ["", ""],
    correctAnswers: []
  });
};
const delSamples = number => {
  form.value.questions.splice(number, 1);
  scoreChange();
};
const saveData = () => {
  try {
    writtenStore.saveWrittenData(form.value);
  } catch (error) {
    ElMessage({
      message: "保存失败",
      type: "error"
    });
  } finally {
    ElMessage({
      message: "保存成功",
      type: "success"
    });
  }
};
const handleSubmit = async () => {
  form.value.questions = form.value.questions.map(item => {
    return { ...item, correctAnswers: [...item.correctAnswers] };
  });

  const res = await addWrittenProblems(form.value);
  if (+res?.code === 200) {
    tabStore.removeTabs(route.fullPath as string, true);
    writtenStore.resetStore();
  } else
    ElMessage({
      message: res.msg,
      type: "error"
    });
};
watchEffect(() => {
  form.value = { ...writtenStore.getWrittenData };
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
