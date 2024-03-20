<template>
  <el-tabs type="border-card" v-model="paneNumber" @tab-change="handleChange">
    <el-tab-pane label="机试题" lazy :name="1">
      <ProTable
        v-if="paneNumber === 1"
        ref="proTable"
        :columns="columns"
        :request-api="getTableList"
        :data-callback="dataCallback"
        @darg-sort="sortTable"
      >
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="addMachineQuesion">添加题目</el-button>
          <el-button type="warning" :icon="Pointer" plain @click="proTable?.element?.toggleAllSelection">全选/全不选</el-button>
          <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="() => {}"> 批量删除 </el-button>
        </template>
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="() => console.log(scope)">编辑</el-button>
          <el-popconfirm title="确认删除?" @confirm="delProblems(scope.row.number)">
            <template #reference>
              <el-button type="danger" link :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ProTable>
    </el-tab-pane>
    <el-tab-pane label="笔试题" lazy :name="2">
      <ProTable
        v-if="paneNumber === 2"
        ref="writtenTable"
        :columns="writtenColumns"
        :request-api="getWrittenList"
        :data-callback="dataCallback"
        @darg-sort="sortTable"
      >
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="addWrittenProblem()">添加题目</el-button>
          <el-button type="warning" :icon="Pointer" plain @click="writtenTable?.element?.toggleAllSelection"
            >全选/全不选</el-button
          >
          <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="() => {}"> 批量删除 </el-button>
        </template>
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen">编辑</el-button>
          <el-popconfirm title="确认删除?" @confirm="delProblems(scope.row.number)">
            <template #reference>
              <el-button type="danger" link :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ProTable>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup name="" lang="tsx">
import ProTable from "@/components/ProTable/index.vue";
import { getMachineProblems, getWrittenProblems, delWrittenProblems, delMachineProblems } from "@/api/modules/problem";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View, Refresh, Pointer } from "@element-plus/icons-vue";
import { useTabsStore } from "@/stores/modules/tabs";
import { useRouter } from "vue-router";

onMounted(() => {});
const tabStore = useTabsStore();
const route = useRouter();
const paneNumber = ref(1);
const proTable: any = ref(null);
const writtenTable: any = ref(null);
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  {
    search: { tooltip: "选择标签搜索数据", key: "tags", label: "标签" },
    render: scope => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => {
            route.push({
              path: "/problem/machineDetail",
              query: { number: scope.row.number }
            });
          }}
        >
          {scope.row.number}
        </el-button>
      );
    }
  },
  {
    prop: "number",
    label: "题号",
    search: { el: "input", tooltip: "输入题号进行搜索" },
    render: scope => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => {
            route.push({
              path: "/problem/machineDetail",
              query: { number: scope.row.number }
            });
          }}
        >
          {scope.row.number}
        </el-button>
      );
    }
  },
  { prop: "title", label: "标题", search: { el: "input", tooltip: "输入标题进行搜索" } },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const writtenColumns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  {
    prop: "number",
    label: "题号",
    search: { el: "input", tooltip: "输入题号进行搜索" },
    render: scope => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => {
            route.push({
              path: "/problem/writtenDetail",
              query: { ...scope.row }
            });
          }}
        >
          {scope.row.number}
        </el-button>
      );
    }
  },
  { prop: "score", label: "分值" },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
]);
const addMachineQuesion = () => {
  route.push("/problem/addMachineProblem");
};
const addWrittenProblem = () => {
  route.push("/problem/addWrittenProblem");
};
const dataCallback = data => {
  return { ...data };
};
const delProblems = async number => {
  if (paneNumber.value === 1) {
    const res = await delMachineProblems(number);
    if (+res.code === 200) {
      proTable.value.getTableList();
    } else ElMessage.error(res.msg);
  } else {
    const res = await delWrittenProblems(number);
    if (+res.code === 200) {
      writtenTable.value.getTableList();
    } else ElMessage.error(res.msg);
  }
};
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  ElMessage.success("修改列表排序成功");
};
const handleChange = () => {
  tabStore.paneChange(paneNumber.value);
};
const getTableList = (params: any) => {
  return getMachineProblems(params);
};
const getWrittenList = (params: any) => {
  return getWrittenProblems(params);
};
watchEffect(() => {
  paneNumber.value = tabStore.getPaneNumber.valueOf();
});
</script>
<style scoped lang="scss"></style>
