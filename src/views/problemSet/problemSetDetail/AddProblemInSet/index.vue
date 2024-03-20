<template>
  <el-dialog v-model="dialogVisible" title="为题组添加题目" width="70%" style="min-width: 400px; position: relative">
    <div class="header">
      <div class="left">
        <el-input v-model="numbers" placeholder="题目编号（格式：1001,1002,1003）" />
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
      <template #tableHeader>
        <el-button type="warning" :icon="Pointer" plain @click="proTable?.element?.toggleAllSelection">全选/全不选</el-button>
      </template>
    </ProTable>
  </el-dialog>
</template>

<script lang="tsx" setup>
import { reactive, ref, watchEffect } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { Plus, Pointer } from "@element-plus/icons-vue";
import { getProblems } from "@/api/modules/problemSet";
import { ColumnProps } from "@/components/ProTable/interface";
import { addMachineProblem } from "@/api/modules/problemSet";
import { ElMessage } from "element-plus";
const props = defineProps<{ id: any; getDetailList: Function; type: "Machine" | "Pencil" }>();
const machineSetId = ref();
const problemSetType = ref();
const dialogVisible = ref(false);
const proTable: any = ref(null);
const numbers = ref("");
const keywords = ref();
const initParam = reactive({ type: 1 });
const pageSizes = [5, 10];
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { prop: "number", label: "题号" },
  { prop: "title", label: "标题", isShow: props.type === "Machine" },
  { prop: "score", label: "分值", isShow: props.type === "Pencil" }
]);
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
// let timer: any = null;
// watch(
//   numbers,
//   (newValue: string) => {
//     if (timer !== null) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       let arrNew: string[] = newValue?.split(",");
//       arrNew?.forEach(element => {
//         if (!proTable.value?.selectedListIds.includes(element)) {
//           proTable.value?.selectedListIds.push(element);
//           console.log(proTable.value?.selectedListIds);
//         }
//       });
//     }, 1000);
//   },
//   { immediate: false }
// );
watchEffect(() => {
  machineSetId.value = props.id;
  problemSetType.value = props.type.toLowerCase();
  numbers.value = proTable.value?.selectedListIds.join();
});
defineExpose({
  openDialog
});
</script>
<style scoped lang="scss">
@import url(./index.scss);
</style>
