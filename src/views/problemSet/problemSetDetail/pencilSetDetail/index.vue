<template>
  <ProTable
    ref="proTable"
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
    :data-callback="dataCallback"
    @darg-sort="sortTable"
    :pagination="false"
    row-key="number"
  >
    <template #tableHeader="scope">
      <el-button type="primary" :icon="CirclePlus" @click="openDialog">添加题目</el-button>
      <el-button type="warning" :icon="Pointer" plain @click="proTable?.element?.toggleAllSelection">全选/全不选</el-button>
      <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="patchDeleteProblem">
        批量删除
      </el-button>
    </template>
    <template #operation="scope">
      <!-- <el-button type="primary" link :icon="EditPen" @click="() => console.log(scope)">编辑</el-button> -->
      <el-button type="primary" link :icon="Delete" @click="deleteProblem(scope.row)">删除</el-button>
    </template>
  </ProTable>
  <AddProblemInSet ref="addDialog" :id="pencilId" :get-detail-list="getDetailList" type="Pencil" />
</template>
<script setup lang="tsx">
import AddProblemInSet from "../AddProblemInSet/index.vue";
import { ref, watchEffect } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { getPencilSetDetail, rearrangeProblem, deleteProblems } from "@/api/modules/problemSet";
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Pointer } from "@element-plus/icons-vue";
const props = defineProps<{ id: any }>();
const pencilId = ref();
const addDialog = ref();
const proTable: any = ref(null);
const initParam = reactive({ type: 1 });
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  {
    prop: "index",
    label: "序号",
    render: scope => scope.$index + 1 + ""
  },
  { prop: "number", label: "题号", search: { el: "input", tooltip: "输入题号进行搜索" } },
  { prop: "score", label: "分值" },
  {
    prop: "tagNames",
    label: "标签",
    render: scope => <el-tag type="primary">{scope.row.tagNames}</el-tag>
  },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const patchDeleteProblem = async () => {
  ElMessageBox.confirm("操作不可恢复，确认删除吗？")
    .then(async () => {
      const res = await deleteProblems(pencilId.value, proTable.value.selectedListIds);
      if (+res.code === 200) {
        ElMessage.success("批量删除成功");
        proTable.value.getTableList();
      } else ElMessage.success("批量删除失败");
    })
    .catch(() => {});
};
const deleteProblem = async row => {
  ElMessageBox.confirm("操作不可恢复，确认删除吗？")
    .then(async () => {
      const res = await deleteProblems(pencilId.value, [row.number]);
      if (+res.code === 200) {
        ElMessage.success("删除成功");
        proTable.value.getTableList();
      } else ElMessage.success("删除失败");
    })
    .catch(() => {});
};
const openDialog = () => {
  addDialog.value.openDialog();
};
const getDetailList = () => {
  proTable.value.getTableList();
};
const dataCallback = data => {
  return [...data];
};
const sortTable = async ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  const numbers = proTable.value?.tableData.map(item => {
    return item.number;
  });
  await rearrangeProblem(pencilId.value, numbers);
  ElMessage.success("修改列表排序成功");
};
const getTableList = () => {
  return getPencilSetDetail(pencilId.value);
};
watchEffect(() => {
  pencilId.value = props.id;
});
</script>
<style scoped lang="scss"></style>
