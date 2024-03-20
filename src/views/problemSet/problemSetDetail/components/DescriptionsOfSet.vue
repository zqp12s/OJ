<template>
  <div class="card table-search" style="display: flex; flex-wrap: nowrap; align-items: center">
    <div style="white-space: nowrap">当前题组包含题目：</div>
    <el-input disabled label="当前题组包含题目：" v-model="numbers"></el-input>
    <el-button v-copy="numbers" type="primary" size="small" style="margin-left: 10px">复制</el-button>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({ problemsOfSet: String });
const numbers = ref("");
watchEffect(() => {
  numbers.value = props.problemsOfSet;
});
</script>
<style scoped lang="scss"></style>
