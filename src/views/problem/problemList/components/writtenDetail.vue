<template>
  <el-card style="max-width: 200vh">
    <p style="font-size: 18px">{{ problemData.title }}</p>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="题目描述" class="title" name="1">
        <richtext :description="problemData.description" :multiple="false" :iswritten-detail="true" />
      </el-collapse-item>
      <el-collapse-item
        v-for="(question, order) in problemData.questions"
        :key="question.id"
        :title="'题目 ' + (order + 1)"
        :name="question.id"
        class="content"
      >
        <div>
          {{
            problemData?.questions[order].allowMultiChoices
              ? "(多选题) ("
              : "(单选题) (" + problemData?.questions[order].score + "分) " + problemData?.questions[order].description
          }}
        </div>
        <p v-for="(item, index) in problemData?.questions[order].choices" :key="item">
          <el-space>
            {{ String.fromCharCode(65 + index) + " " + item }}
            <el-button
              v-if="problemData?.questions[order].correctAnswers.includes(String.fromCharCode(65 + index))"
              type="success"
              :icon="Check"
              circle
            />
          </el-space>
        </p>
      </el-collapse-item>
    </el-collapse>
    <div class="title"></div>
  </el-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getWrittenDetail } from "@/api/modules/problem";
import { ElMessage } from "element-plus";
import { Check } from "@element-plus/icons-vue";
import richtext from "../../addProblem/machineQuestion/components/richtext.vue";

const route = useRoute();
const problemData: any = ref({});
const activeNames = ref(["1"]);

onMounted(async () => {
  const res = await getWrittenDetail(route.query?.number);
  if (+res.code === 200) {
    problemData.value = res.data;
    for (let question of problemData.value.questions) {
      activeNames.value.push(question.id);
    }
    problemData.value.title =
      "题号:" + problemData.value.number + " (共" + problemData.value?.questions.length + "题," + problemData.value.score + "分)";
  } else ElMessage.error(res.msg);
});
</script>
<style>
* {
  font-family: monospace;
  font-size: 15px;
}
.title .el-collapse-item__header {
  font: 20px bold;
}
.content .el-collapse-item__header {
  font: 15px bold;
}
</style>
