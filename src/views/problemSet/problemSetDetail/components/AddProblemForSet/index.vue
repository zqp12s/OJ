<template>
  <el-dialog v-model="dialogVisible" title="为题组添加题目" width="70%" style="position: relative; min-width: 400px">
    <div style="display: flex; flex-wrap: nowrap; align-items: center; margin-bottom: 20px">
      <div style="white-space: nowrap">当前题组已包含题目：</div>
      <el-input disabled label="当前题组已包含题目：" v-model="problemsInSet"></el-input>
    </div>
    <div class="header">
      <div class="left">
        <el-input v-model="numbers" placeholder="题目编号（格式：1001,1002,1003）" @input="limitIptNumber" />
        <el-button type="primary" @click="patchAdd">批量添加</el-button>
      </div>
      <div class="right">
        <el-input v-model="keywords" placeholder="题号/标题" />
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
      :tool-button="false"
      :pagination-sizes="pageSizes"
      :pagination-size="pageSizes[0]"
      row-key="number"
    >
    </ProTable>
  </el-dialog>
</template>
<script lang="tsx" setup>
import { reactive, ref, watchEffect } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { getProblems } from "@/api/modules/problemSet";
import { ColumnProps } from "@/components/ProTable/interface";
import { addMachineProblem } from "@/api/modules/problemSet";
import { ElMessage } from "element-plus";
const props = defineProps<{ id: any; getDetailList: Function; type: "Machine" | "Pencil"; problemsOfSet: string }>();
const machineSetId = ref();
const problemSetType = ref();
const dialogVisible = ref(false);
const proTable: any = ref(null);
const numbers = ref("");
const keywords = ref();
const initParam = reactive({ type: 1 });
const pageSizes = [5, 10];
const problemsInSet = ref("");
const columns = reactive<ColumnProps<any>[]>([
  { prop: "number", label: "题号" },
  { prop: "title", label: "标题", isShow: props.type === "Machine" },
  { prop: "score", label: "分值", isShow: props.type === "Pencil" }
]);
const limitIptNumber = () => {
  let str = numbers.value;
  str = str.replace(/[^\d^\,]+/g, "");
  numbers.value = str;
};
const search = () => {};
const patchAdd = async () => {
  const res = await addMachineProblem(machineSetId.value, numbers.value, problemSetType.value);
  if (+res.code === 200) {
    ElMessage({ message: "添加成功", type: "success", duration: 1000 });
    props.getDetailList();
    keywords.value = "";
    numbers.value = "";
    dialogVisible.value = false;
  }
};
const openDialog = () => {
  dialogVisible.value = true;
};
const dataCallback = data => {
  return { ...data };
};
const getTableList = (params: any) => {
  return getProblems(problemSetType.value, params);
};
watchEffect(() => {
  machineSetId.value = props.id;
  problemSetType.value = props.type.toLowerCase();
  numbers.value = proTable.value?.selectedListIds.join();
  problemsInSet.value = props.problemsOfSet;
});
defineExpose({
  openDialog
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
