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
      <el-button type="primary" link :icon="EditPen" @click="() => console.log(scope)">编辑</el-button>
      <el-button type="primary" link :icon="Delete" @click="deleteProblem(scope.row)">删除</el-button>
    </template>
  </ProTable>
  <AddProblemInSet ref="addDialog" :id="machineId" :get-detail-list="getDetailList" type="Machine" />
</template>
<script setup lang="tsx">
import { ref, watchEffect } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import AddProblemInSet from "../AddProblemInSet/index.vue";
import { getMachineSetDetail, rearrangeProblem, deleteProblems } from "@/api/modules/problemSet";
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Pointer } from "@element-plus/icons-vue";
const props = defineProps<{ id: any }>();
const machineId = ref();
const proTable: any = ref(null);
const addDialog = ref();
const initParam = reactive({ type: 1 });
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  {
    prop: "index",
    label: "序号",
    render: scope => String.fromCharCode(65 + scope.$index)
  },
  { prop: "number", label: "题号", search: { el: "input", tooltip: "输入题号进行搜索" } },
  { prop: "title", label: "标题", search: { el: "input", tooltip: "输入标题进行搜索" } },
  { prop: "level", label: "难度" },
  { prop: "score", label: "分值" },
  {
    prop: "tagNames",
    label: "标签",
    render: scope => <el-tag type="primary">{scope.row.tagNames}</el-tag>
  },
  {
    prop: "visible",
    label: "是否可见",
    render: scope => <el-switch disabled v-model={scope.row.visible}></el-switch>
  },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const getDetailList = () => {
  proTable.value.getTableList();
};
const patchDeleteProblem = async () => {
  ElMessageBox.confirm("操作不可恢复，确认删除吗？")
    .then(async () => {
      const res = await deleteProblems(machineId.value, proTable.value.selectedListIds);
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
      const res = await deleteProblems(machineId.value, [row.number]);
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
const dataCallback = data => {
  return data;
};
const sortTable = async ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  const numbers = proTable.value?.tableData.map(item => {
    return item.number;
  });
  await rearrangeProblem(machineId.value, numbers);
  ElMessage.success("修改列表排序成功");
};
const getTableList = async () => {
  return await getMachineSetDetail(machineId.value);
};
watchEffect(() => {
  machineId.value = props.id;
});
</script>
<style scoped lang="scss"></style>
